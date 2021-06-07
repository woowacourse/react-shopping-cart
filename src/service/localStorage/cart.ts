import { LOCAL_STORAGE_KEY } from '../../constants/localStorage';

interface CartItemAdditionalData {
  id: string;
  quantity: number;
  checked: boolean;
}

export const getCartItemAdditionalDataInLocalStorage = (itemId: string): CartItemAdditionalData => {
  const jsonData = localStorage.getItem(LOCAL_STORAGE_KEY.CART_ITEM_LIST);
  const defaultReturnValue: CartItemAdditionalData = {
    id: itemId,
    quantity: 1,
    checked: true,
  };

  if (!jsonData) {
    return defaultReturnValue;
  }

  const cartItems: CartItemAdditionalData[] = JSON.parse(jsonData);
  const targetCartItem = cartItems.find((item) => item.id === itemId);

  if (!targetCartItem) {
    return defaultReturnValue;
  }

  return targetCartItem;
};

export const setCartItemAdditionalDataInLocalStorage = (
  CartItemAdditionalData: CartItemAdditionalData
) => {
  const jsonData = localStorage.getItem(LOCAL_STORAGE_KEY.CART_ITEM_LIST);

  if (!jsonData) {
    localStorage.setItem(
      LOCAL_STORAGE_KEY.CART_ITEM_LIST,
      JSON.stringify([{ ...CartItemAdditionalData }])
    );
    return;
  }

  const cartItems: CartItemAdditionalData[] = JSON.parse(jsonData);
  const targetCartItemIndex = cartItems.findIndex((item) => item.id === CartItemAdditionalData.id);

  if (targetCartItemIndex === -1) {
    localStorage.setItem(
      LOCAL_STORAGE_KEY.CART_ITEM_LIST,
      JSON.stringify([...cartItems, { ...CartItemAdditionalData }])
    );
    return;
  }

  cartItems[targetCartItemIndex] = { ...CartItemAdditionalData };

  localStorage.setItem(LOCAL_STORAGE_KEY.CART_ITEM_LIST, JSON.stringify(cartItems));
};

export const deleteCartItemAdditionalDataInLocalStorage = (cartId: string) => {
  const jsonData = localStorage.getItem(LOCAL_STORAGE_KEY.CART_ITEM_LIST);

  if (!jsonData) {
    return;
  }

  const cartItems: CartItemAdditionalData[] = JSON.parse(jsonData);
  const modifiedCartItems = cartItems.filter((item) => item.id !== cartId);

  localStorage.setItem(LOCAL_STORAGE_KEY.CART_ITEM_LIST, JSON.stringify(modifiedCartItems));
};

export const clearCartItemAdditionalDataInLocalStorage = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY.CART_ITEM_LIST, JSON.stringify([]));
};
