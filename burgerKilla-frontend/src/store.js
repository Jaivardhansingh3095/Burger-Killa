import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../src/features/cart/cartSlice';
import userReducer from '../src/features/authentication/userSlice';
import { loadCart } from './utils/cartLocalStorage';

const preloadedState = {
  cart: {
    cart: loadCart(),
  },
};

const store = configureStore({
  reducer: { cart: cartReducer, user: userReducer },
  preloadedState,
});

export default store;
