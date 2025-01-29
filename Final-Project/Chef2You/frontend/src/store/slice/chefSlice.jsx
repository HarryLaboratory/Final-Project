import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchChefs, fetchChefById } from '../../services/chefService';  // Correct import

// Async thunk to fetch list of chefs
export const getChefs = createAsyncThunk('chefs/fetchChefs', async () => {
  const response = await fetchChefs();
  return response.data;  // Assuming response contains an array of chefs
});

// Async thunk to fetch details of a single chef
export const getChefDetails = createAsyncThunk('chefs/fetchChefDetails', async (id) => {
  const response = await fetchChefById(id);  // Use fetchChefById here
  return response.data;  // Assuming response contains detailed information of the chef
});

const chefSlice = createSlice({
  name: 'chefs',
  initialState: {
    chefs: [],
    selectedChef: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearSelectedChef: (state) => {
      state.selectedChef = null;  // Clear selected chef when navigating away from the chef detail page
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChefs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getChefs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chefs = action.payload;  // Store the list of chefs in the state
      })
      .addCase(getChefs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getChefDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getChefDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedChef = action.payload;  // Save detailed info of selected chef
      })
      .addCase(getChefDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedChef } = chefSlice.actions;

export default chefSlice.reducer;

