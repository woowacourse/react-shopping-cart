import mockData from '../assets/mockData.json';

export const CART_ITEMS_KEY = 'cartItemsKey';
export const PRODUCT_LIST_KEY = 'productListKey';

export const getCartItems = () => {
  const localStorageCartItems = localStorage.getItem(CART_ITEMS_KEY) ?? '[]';
  const cartItems = JSON.parse(localStorageCartItems);

  if (!Array.isArray(cartItems))
    throw new Error('장바구니 정보가 배열 형식이 아닙니다!');

  return cartItems;
};

export const getProductList = () => {
  const localStorageProductList =
    localStorage.getItem(PRODUCT_LIST_KEY) ?? '[]';
  const productList = JSON.parse(localStorageProductList);

  if (localStorageProductList === '[]') {
    localStorage.setItem(PRODUCT_LIST_KEY, JSON.stringify(mockData));
    return mockData;
  }

  if (!Array.isArray(productList))
    throw new Error('상품 목록이 배열 형식이 아닙니다!');

  return productList;
};
