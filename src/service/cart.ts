import { CUSTOMER_NAME } from '../appConfig';
import { ERROR_MESSAGE } from '../constants/error';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { CartItem, CartItemResponse } from '../types';
import customAxios from '../database/API';
import { getLocalStorageItem, setLocalStorageItem } from '../database/localStorage';

interface IncompleteCartItem {
  id: string;
  price: number;
  name: string;
  image: string;
}

interface CartItemAdditionalData {
  id: string;
  quantity: number;
  checked: boolean;
}

export const getCartItemList = async (): Promise<IncompleteCartItem[]> => {
  const { data: cartItemList } = await customAxios.get<CartItemResponse[]>(
    `/api/customers/${CUSTOMER_NAME}/carts`
  );

  const appSchema = (cartItemList: CartItemResponse[]) =>
    cartItemList.map((item) => {
      return {
        id: String(item.cart_id),
        price: item.price,
        name: item.name,
        image: item.image_url,
      };
    });

  return Promise.resolve(appSchema(cartItemList));
};

export const addCartItem = async (productId: string): Promise<string> => {
  const APISchema = (productId: string) => ({
    product_id: Number(productId),
  });

  const {
    headers: { location },
  } = await customAxios.post(`/api/customers/${CUSTOMER_NAME}/carts`, APISchema(productId));

  const appSchema = (location: string) => location.match(/[0-9]+$/)?.[0] || null;

  const cartId = appSchema(location);

  if (!cartId) {
    throw new Error(ERROR_MESSAGE.INVALID_CART_ID_FROM_SERVER);
  }

  return Promise.resolve(cartId);
};

export const deleteCartItem = (cartItemId: string) =>
  customAxios.delete(`/api/customers/${CUSTOMER_NAME}/carts/${cartItemId}`);

export const deleteCartItems = (items: CartItem[]) => {
  Promise.all(items.map((item) => deleteCartItem(item.id)));
};

export const getCartItemAdditionalData = (itemId: string): CartItemAdditionalData => {
  const cartItems = getLocalStorageItem<CartItemAdditionalData[]>(LOCAL_STORAGE_KEY.CART_ITEM_LIST);
  const defaultReturnValue: CartItemAdditionalData = {
    id: itemId,
    quantity: 1,
    checked: true,
  };

  if (!cartItems) {
    return defaultReturnValue;
  }

  const targetCartItem = cartItems.find((item) => item.id === itemId);

  return targetCartItem || defaultReturnValue;
};

export const setCartItemAdditionalData = (CartItemAdditionalData: CartItemAdditionalData) => {
  const cartItems = getLocalStorageItem<CartItemAdditionalData[]>(LOCAL_STORAGE_KEY.CART_ITEM_LIST);

  if (!cartItems) {
    setLocalStorageItem(LOCAL_STORAGE_KEY.CART_ITEM_LIST, [{ ...CartItemAdditionalData }]);
    return;
  }

  const targetCartItemIndex = cartItems.findIndex((item) => item.id === CartItemAdditionalData.id);

  if (targetCartItemIndex === -1) {
    setLocalStorageItem(LOCAL_STORAGE_KEY.CART_ITEM_LIST, [
      ...cartItems,
      { ...CartItemAdditionalData },
    ]);
    return;
  }

  cartItems[targetCartItemIndex] = { ...CartItemAdditionalData };

  setLocalStorageItem(LOCAL_STORAGE_KEY.CART_ITEM_LIST, cartItems);
};

export const deleteCartItemAdditionalData = (cartId: string) => {
  const cartItems = getLocalStorageItem<CartItemAdditionalData[]>(LOCAL_STORAGE_KEY.CART_ITEM_LIST);

  if (!cartItems) {
    return;
  }

  const modifiedCartItems = cartItems.filter((item) => item.id !== cartId);

  setLocalStorageItem(LOCAL_STORAGE_KEY.CART_ITEM_LIST, modifiedCartItems);
};

export const clearCartItemAdditionalData = () => {
  setLocalStorageItem(LOCAL_STORAGE_KEY.CART_ITEM_LIST, []);
};
