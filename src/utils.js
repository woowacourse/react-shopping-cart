export const getCheckedCarts = (carts) =>
  carts.filter((cart) => cart.checked === true);
