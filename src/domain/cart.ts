import { CART_LIST_LOCAL_STORAGE_KEY } from '../constants';
import productListData from '../data/mockData.json';
import { CartItemData } from '../types';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const getCartData = () => {
  return getFromLocalStorage<CartItemData[]>(CART_LIST_LOCAL_STORAGE_KEY) ?? [];
};

const setCartData = (newCartList: CartItemData[]) => {
  saveToLocalStorage(CART_LIST_LOCAL_STORAGE_KEY, newCartList);
};

const checkItemInCart = (cartList: CartItemData[], productId: number) => {
  return cartList.some((cartItem) => cartItem.product.id === productId);
};

const addCartItemQuantity = (cartList: CartItemData[], productId: number, quantity: number) => {
  const hasItem = checkItemInCart(cartList, productId);

  if (hasItem) {
    return cartList.map((cartItem) => {
      if (cartItem.product.id === productId) {
        return { ...cartItem, quantity: cartItem.quantity + quantity };
      }

      return cartItem;
    });
  }

  const newCartId = Number(new Date());
  const product = productListData.find((productItem) => productItem.id === productId);

  if (!product) return null;

  return [...cartList, { id: newCartId, quantity, product }];
};

const updateCartItemQuantity = (cartList: CartItemData[], productId: number, quantity: number) => {
  const hasItem = checkItemInCart(cartList, productId);

  if (!hasItem) return null;

  return cartList.map((cartItem) => {
    if (cartItem.product.id === productId) {
      return { ...cartItem, quantity };
    }

    return cartItem;
  });
};

const removeCartItem = (cartList: CartItemData[], productId: number) => {
  const hasItem = checkItemInCart(cartList, productId);

  if (!hasItem) return null;

  return cartList.filter((cartItem) => cartItem.product.id !== productId);
};

export {
  getCartData,
  setCartData,
  checkItemInCart,
  addCartItemQuantity,
  updateCartItemQuantity,
  removeCartItem,
};
