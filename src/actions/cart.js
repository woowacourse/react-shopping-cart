import { 장바구니_액션 } from './types';

const addCartList = (product, count = 1) => {
  const targetProduct = { ...product, count, isChecked: true };
  return { type: 장바구니_액션.ADD_CART, payload: targetProduct };
};

export { addCartList };
