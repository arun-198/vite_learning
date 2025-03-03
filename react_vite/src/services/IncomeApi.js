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

export const addInflowsByMonth = async (month, updatedInflow) => {
  try {
    const response = await api.put(`/inflows/${month}`, updatedInflow);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      try {
          const postResponse = await api.post('/inflows', updatedInflow); // Make the POST request
          return postResponse.data;
      } catch (postError) {
          console.error(`Error creating inflow (POST):`, postError);
          throw postError; // Re-throw the POST error
      }
    } else {
      console.error(`Error updating inflow item ${month}:`, error);
      throw error; // Re-throw the original error if it's not a 404
    }
  }
};

export const deleteInflowsByMonth = async(month,updatedInflow) => {
  try {
    const response = await api.put(`/inflows/${month}`,updatedInflow);
    return response.data;
  } catch (error) {
    console.error(`Error deleting Inflow item for ${month}:`, error);
    throw error; // Re-throw the error for the component to handle
  }
};