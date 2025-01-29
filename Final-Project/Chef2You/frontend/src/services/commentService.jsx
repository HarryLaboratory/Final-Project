import axios from 'axios';

// Using the environment variable for the API URL
const API_URL = import.meta.env.VITE_API_URL;  

// Add comment
export const addComment = async (commentData) => {
  try {
    const token = localStorage.getItem('token');  
    if (!token) {
      throw new Error('No token found, please log in');  // error if any token find
    }

    const response = await axios.post(`${API_URL}/comments`, commentData, {
      headers: { Authorization: `Bearer ${token}` },  
    });

    // Vérifi response 
    if (response && response.data) {
      return response.data;  
    } else {
      throw new Error('Failed to add comment, no data returned');
    }

  } catch (error) {
    // Handling backend errors
    if (error.response) {
      // (ex: 400, 500)
      console.error('Server error:', error.response.data);
    } else if (error.request) {
      
      console.error('Network error:', error.request);
    } else {
      
      console.error('Error adding comment:', error.message);
    }
    throw error;  
  }
};



