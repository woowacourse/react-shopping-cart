import { 장바구니_액션 } from './types';

const addCartList = (product, cartList) => {
  let isExist = false;
  let count = 1;

  cartList.every((item) => {
    if (item.id === product.id) {
      isExist = true;
      count = Number(item.count) + 1;
      return false;
    }
    return true;
  });

  const targetProduct = { ...product, count, isChecked: true };

  if (isExist) return { type: 장바구니_액션.ADD_EXIST_PRODUCT, payload: targetProduct };
  return { type: 장바구니_액션.ADD_NEW_PRODUCT, payload: targetProduct };
};

export { addCartList };
