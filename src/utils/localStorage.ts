import mockData from '../assets/mockData.json';
import { CartItemType } from '../recoil/atoms/cartAtom';

export const CART_ITEMS_KEY = 'cartItemsKey';
export const PRODUCT_LIST_KEY = 'productListKey';

export const getCartItemsFromLocalStorage = () => {
  const localStorageCartItems = localStorage.getItem(CART_ITEMS_KEY) ?? '[]';
  const cartItems = JSON.parse(localStorageCartItems);

  if (!Array.isArray(cartItems))
    throw new Error('장바구니 정보가 배열 형식이 아닙니다!');

  return cartItems;
};

export const getProductListFromLocalStorage = () => {
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

export const addCartItemToLocalStorage = (cartItem: CartItemType) => {
  const cartItems = getCartItemsFromLocalStorage();

  localStorage.setItem(
    CART_ITEMS_KEY,
    JSON.stringify([...cartItems, cartItem])
  );
};

export const patchCartItemQuantityToLocalStorage = (
  productId: number,
  quantity: number
) => {
  const cartItems = getCartItemsFromLocalStorage();

  localStorage.setItem(
    CART_ITEMS_KEY,
    JSON.stringify(
      cartItems.map((cartItem) => {
        if (cartItem.id === productId) return { ...cartItem, quantity };
        return cartItem;
      })
    )
  );
};

export const deleteCartItemsFromLocalStorage = (productId: number) => {
  const cartItems = getCartItemsFromLocalStorage();

  localStorage.setItem(
    CART_ITEMS_KEY,
    JSON.stringify(cartItems.filter((cartItem) => cartItem.id !== productId))
  );
};
