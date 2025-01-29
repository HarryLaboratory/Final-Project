import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

// Récupérer les commentaires pour un chef
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (chefId) => {
    const response = await axios.get(`${apiUrl}/comments/chef/${chefId}`);
    return response.data; // La réponse devrait contenir comments et avgRating
  }
);

// Ajouter un commentaire
export const addComment = createAsyncThunk(
  'comments/addComment',
  async (commentData) => {
    const response = await axios.post(`${apiUrl}/comments`, commentData);
    return response.data; // Assurez-vous que la réponse contient les données nécessaires
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    averageRating: 0,
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Retreive comments
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload.comments;
      state.averageRating = action.payload.avgRating;
      state.status = 'succeeded';
    });
    
    builder.addCase(fetchComments.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(fetchComments.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    // Add comment
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload.newComment);  // Add the comment to the state
      state.averageRating = action.payload.avgRating; // Update the average rating
    });
  },
});

export default commentSlice.reducer;


