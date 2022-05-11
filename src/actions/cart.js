import { CARTS_ACTIONS } from './types';

const addCartList = (products, count = 1) => {
  const addProduct = { ...products, count, isChecked: true };
  return { type: CARTS_ACTIONS.ADD_CART_LIST, payload: addProduct };
};

export { addCartList };
