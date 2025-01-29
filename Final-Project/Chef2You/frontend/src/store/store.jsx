import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice'; 
import chefReducer from './slice/chefSlice';
import commentReducer from './slice/commentSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    chefs: chefReducer,
    comments: commentReducer,  // Add commentReducer to the store
  },
});

export default store;



