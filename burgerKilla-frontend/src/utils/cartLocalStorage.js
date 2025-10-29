export const loadCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));

  return cart?.length ? cart : [];
};

export const saveCart = (state) => {
  try {
    localStorage.setItem('cart', JSON.stringify(state.cart.cart));
  } catch (err) {
    console.error('Some error while saving cart to storage: ', err);
  }
};
