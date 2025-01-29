import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  

// Signup User
export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data;  // will contain the user info or JWT token
};

// Login User
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;  // will contain the JWT token
};

// Get User 
export const getUser = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Sending the JWT token in the header
      },
    });
    return response.data;  // should contain user details
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
};


