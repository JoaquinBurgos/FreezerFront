import axios from 'axios';
import { store } from '../store';
import { logout, loginSuccess } from '../features/auth/authSlice';

// Establece las cookies con credenciales en cada solicitud, si es necesario
axios.defaults.withCredentials = true;

// Variable para llevar la cuenta de los intentos de refresco
let refreshAttempt = 0;
const MAX_REFRESH_ATTEMPTS = 1; // Define el máximo de intentos de refresco aquí, p.ej., 1

axios.interceptors.response.use(
  response => response, // Simplemente retorna la respuesta si todo está bien
  async error => {
    const originalRequest = error.config;
    // Verifica si el error es 401, aún no se ha reintentado, y el usuario está autenticado
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (refreshAttempt < MAX_REFRESH_ATTEMPTS) {
        originalRequest._retry = true;
        refreshAttempt++; // Incrementa el contador de intentos

        try {
          // Intenta refrescar el token aquí
          console.log("Intentando refrescar el token...");
          const { data } = await axios.post(`${process.env.REACT_APP_AUTH_API}/api/token/refresh/`);

          // Almacena el nuevo token en tu store de Redux
          console.log("Token refrescado con éxito:", data);
          store.dispatch(loginSuccess({ accessToken: data.accessToken }));

          // Actualiza el token de acceso en las cabeceras para el request original
          originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

          // Retorna el originalRequest para reintentarlo con el nuevo token
          return axios(originalRequest);
        } catch (_error) {
          // Si algo sale mal (ej., el refreshToken también expiró), realiza el logout
          console.error("Error al refrescar el token:", _error);
          store.dispatch(logout());
          refreshAttempt = 0; // Restablece el contador de intentos
          return Promise.reject(_error);
        }
      } else {
        // Manejo del caso cuando se supera el máximo de intentos
        console.log("Se superó el máximo de intentos de refresco de token.");
        store.dispatch(logout());
        refreshAttempt = 0; // Restablece el contador de intentos
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
