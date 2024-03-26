import { loginSuccess } from '../../features/auth/authSlice';
import axios from '../axiosConfig';

export const login = async (dispatch,username, password) => {
  try {
    console.log(`${process.env.REACT_APP_AUTH_API}/api/token/`)
    const response = await axios.post(`${process.env.REACT_APP_AUTH_API}/api/token/`, {
      username,
      password,
    });
    dispatch(loginSuccess({
      accessToken: response.data.access,
    }));
  } catch (error) {
    console.error('Error during login:', error);
    // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
  }
};