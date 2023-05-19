export const CART_ID_LIST_KEY = 'cartIDListKey';
export const CART_ITEM_QUANTITIES_KEY = 'cartItemQuantitiesKey';

export const getCartIdList = () => {
  const localStorageCartIdList = localStorage.getItem(CART_ID_LIST_KEY) ?? '[]';
  const cartIdList = JSON.parse(localStorageCartIdList);

  if (!Array.isArray(cartIdList))
    throw new Error('장바구니 리스트가 배열 형식이 아닙니다.');

  return cartIdList;
};

export const getCartItemQuantities = () => {
  const localStorageCartItemQuantities =
    localStorage.getItem(CART_ITEM_QUANTITIES_KEY) ?? '{}';
  const cartItemQuantities = JSON.parse(localStorageCartItemQuantities);

  return cartItemQuantities;
};
