import axios from '../axiosConfig';

// Acción de Redux para manejar el éxito de la obtención de clientes

// Función para obtener clientes basada en el texto de búsqueda
export const getProducts = async (token, searchText) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_PRODUCTS_API}/api/products/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching clients:', error);
      // Maneja el error aquí
    }
  };