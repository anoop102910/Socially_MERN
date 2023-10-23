// store.js
import { configureStore } from '@reduxjs/toolkit';
import { postReducer } from './slice/postSlice';
import { authReducer } from './slice/authSlice';

const store = configureStore({
  reducer: {
    post: postReducer,
    auth:authReducer
  },
});

export default store;
