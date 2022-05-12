import { CARTS_ACTIONS } from './types';

const addCartList = (product, count = 1) => {
  const targetProduct = { ...product, count, isChecked: true };
  return { type: CARTS_ACTIONS.ADD_CART_LIST, payload: targetProduct };
};

export { addCartList };
