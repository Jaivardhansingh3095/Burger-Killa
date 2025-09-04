import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cart.push({ ...action.payload, itemId: nanoid() });
    },
    incItemQuantity(state, action) {
      const item = state.cart.find((item) => item.itemId === action.payload);
      item.quantity++;
      item.totalPrice =
        item.quantity * item.price +
        item.addOns.reduce((sum, addon) => sum + addon.price, 0) *
          item.quantity;
    },
    decItemQuantity(state, action) {
      const item = state.cart.find((item) => item.itemId === action.payload);
      item.quantity--;

      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
        return;
      }
      item.totalPrice =
        item.quantity * item.price +
        item.addOns.reduce((sum, addon) => sum + addon.price, 0) *
          item.quantity;
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.itemId !== action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;

export const { addItem, incItemQuantity, decItemQuantity, deleteItem } =
  cartSlice.actions;

export const selectCart = (state) => state.cart.cart;

export const selectTotalPrice = createSelector(
  (state) => selectCart(state),
  (cart) => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  },
);

export const selectCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const selectQuantityById = (state, id) =>
  state.cart.cart.find((item) => item.itemId === id)?.quantity ?? 0;
