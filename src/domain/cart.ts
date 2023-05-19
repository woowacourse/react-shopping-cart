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

const findCartItemIndex = (cartList: CartItemData[], productId: number) => {
  return cartList.findIndex((cartItem) => cartItem.product.id === productId);
};

const addCartItemQuantity = (cartList: CartItemData[], productId: number, quantity: number) => {
  const selectedCartItemIndex = findCartItemIndex(cartList, productId);

  if (selectedCartItemIndex === -1) {
    const newCartId = Number(new Date());
    const product = productListData.find((productItem) => productItem.id === productId)!;

    return [...cartList, { id: newCartId, quantity, product }];
  }

  const updatedCartList = [
    ...cartList.slice(0, selectedCartItemIndex),
    {
      ...cartList[selectedCartItemIndex],
      quantity: quantity + cartList[selectedCartItemIndex].quantity,
    },
    ...cartList.slice(selectedCartItemIndex + 1),
  ];

  return updatedCartList;
};

const updateCartItemQuantity = (cartList: CartItemData[], productId: number, quantity: number) => {
  const selectedCartItemIndex = findCartItemIndex(cartList, productId);

  const updatedCartList = [
    ...cartList.slice(0, selectedCartItemIndex),
    {
      ...cartList[selectedCartItemIndex],
      quantity,
    },
    ...cartList.slice(selectedCartItemIndex + 1),
  ];

  return updatedCartList;
};

const removeCartItem = (cartList: CartItemData[], productId: number) => {
  const selectedCartItemIndex = findCartItemIndex(cartList, productId);

  if (selectedCartItemIndex === -1) return [...cartList];

  const updatedCartList = [
    ...cartList.slice(0, selectedCartItemIndex),
    ...cartList.slice(selectedCartItemIndex + 1),
  ];

  return updatedCartList;
};

export {
  getCartData,
  setCartData,
  checkItemInCart,
  addCartItemQuantity,
  updateCartItemQuantity,
  removeCartItem,
};
