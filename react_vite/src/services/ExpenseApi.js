import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Use environment variables

const api = axios.create({
  baseURL: API_BASE_URL,
  // You can add other default settings here, like headers (e.g., authorization)
  // timeout: 10000, // Example timeout
});

// Example API functions
export const getExpenses = async () => {
  try {
    const response = await api.get('/expenses');
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error; // Re-throw the error for the component to handle
  }
};

export const getExpensesByMonth = async (month) => {
    try {
      const response = await api.get(`/expenses/${month}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching item ${month}:`, error);
      throw error; // Re-throw the error for the component to handle
    }
  };

  export const updateExpensesByMonth = async (month, updatedExpense) => {
    try {
      const response = await api.put(`/expenses/${month}`, updatedExpense);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        try {
            const postResponse = await api.post('/expenses', updatedExpense); // Make the POST request
            return postResponse.data;
        } catch (postError) {
            console.error(`Error creating expense (POST):`, postError);
            throw postError; // Re-throw the POST error
        }
    } else {
        console.error(`Error updating item ${month}:`, error);
        throw error; // Re-throw the original error if it's not a 404
    }
    }
  };

  export const updateExpenseCatByMonth = async (month, updatedExpense) => {
    try {
      const response = await api.put(`/expenses/${month}`, updatedExpense);
      return response.data;
    } catch (error) {
        console.error(`Error updating expense cat ${month}:`, error);
        throw error; 
    }
  };