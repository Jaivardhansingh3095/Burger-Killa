import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../src/features/cart/cartSlice';
import userReducer from '../src/features/authentication/userSlice';

const store = configureStore({
  reducer: { cart: cartReducer, user: userReducer },
});

export default store;
