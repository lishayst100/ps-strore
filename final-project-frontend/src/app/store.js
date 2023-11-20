import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../features/adminSlice';
import cartReducer from "../features/cartSlice";


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    games: adminReducer,
  },
});
