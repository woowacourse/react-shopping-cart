export const CART_LIST_KEY = 'cartIdListKey';
export const PRODUCT_QUANTITY_LIST_KEY = 'productQuantityListKey';

export const getCartIdList = () => {
  const localStorageCartIdList = localStorage.getItem(CART_LIST_KEY) ?? '[]';
  const cartIdList = JSON.parse(localStorageCartIdList);

  if (!Array.isArray(cartIdList))
    throw new Error('장바구니 리스트가 배열 형식이 아닙니다.');

  return cartIdList;
};

export const getProductQuantityList = () => {
  const localStorageProductList =
    localStorage.getItem(PRODUCT_QUANTITY_LIST_KEY) ?? '{}';

  const productQuantityList = JSON.parse(localStorageProductList);

  return productQuantityList;
};
