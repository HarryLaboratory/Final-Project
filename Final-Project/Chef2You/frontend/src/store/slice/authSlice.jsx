import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, signup, getUser } from '../../services/authService';  

// Action to connect
export const loginUser = createAsyncThunk('auth/login', async (userData) => {
  const response = await login(userData);
  console.log(response);  
  return { token: response.token, user: response.user }; // Sending the token and the user
});

// Action subscribe
export const signupUser = createAsyncThunk('auth/signup', async (userData) => {
  const response = await signup(userData);
  console.log(response);  
  return { token: response.token, user: response.user }; // Sending the token and the user
});

// Action to retrieve the user if the token already exists
export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  const response = await getUser(token);  // API call to retrieve the user with the token
  return response.user;  // Return the user
});

// Create slice authentification
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,  // Retrieve the token from localStorage on startup
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    // Action to disconnect
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');  // Remove the token from localStorage upon logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token);  // Save the token in localStorage after login
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token);  // Save the token in localStorage after registration
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;  // The user retrieved from the API
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;




