import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL; // Use environment variables

const api = axios.create({
    baseURL: API_BASE_URL,
    // You can add other default settings here, like headers (e.g., authorization)
    // timeout: 10000, // Example timeout
});

  export const getInflows = async () => {
    try {
      const response = await api.get('/inflows');
      return response.data;
    } catch (error) {
      console.error("Error fetching Inflow items:", error);
      throw error; // Re-throw the error for the component to handle
    }
};

export const getInflowsByMonth = async (month) => {
    try {
      const response = await api.get(`/inflows/${month}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching Inflow item ${month}:`, error);
      throw error; // Re-throw the error for the component to handle
    }
};