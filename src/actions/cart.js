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

const deleteCartItem = (productId) => ({ type: 장바구니_액션.DELETE_PRODUCT, payload: productId });

const modifyCartItemCount = (productId, count) => ({
  type: 장바구니_액션.MODIFY_PRODUCT_COUNT,
  payload: { productId, count },
});

export { addCartList, deleteCartItem, modifyCartItemCount };
