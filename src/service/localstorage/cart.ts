import PropTypes from 'prop-types';

interface CartItemAdditionalData {
  id: string;
  quantity: number;
  checked: boolean;
}

//TODO: 키값 상수화
export const getCartItemAdditionalDataInLocalStorage = (itemId: string): CartItemAdditionalData => {
  //TODO: 제이슨 stringify, parse를 한번 공통 유틸로 묶기( getItem, setItem으로)
  const jsonData = localStorage.getItem('cartItemList');
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
  const jsonData = localStorage.getItem('cartItemList');

  if (!jsonData) {
    localStorage.setItem('cartItemList', JSON.stringify([{ ...CartItemAdditionalData }]));
    return;
  }

  const cartItems: CartItemAdditionalData[] = JSON.parse(jsonData);
  const targetCartItemIndex = cartItems.findIndex((item) => item.id === CartItemAdditionalData.id);

  if (targetCartItemIndex === -1) {
    localStorage.setItem(
      'cartItemList',
      JSON.stringify([...cartItems, { ...CartItemAdditionalData }])
    );
    return;
  }

  cartItems[targetCartItemIndex] = { ...CartItemAdditionalData };

  localStorage.setItem('cartItemList', JSON.stringify(cartItems));
};

//TODO: localstorage 폴더이름 -> localStorage
export const deleteCartItemAdditionalDataInLocalStorage = (cartId: string) => {
  const jsonData = localStorage.getItem('cartItemList');

  if (!jsonData) {
    return;
  }

  const cartItems: CartItemAdditionalData[] = JSON.parse(jsonData);
  const modifiedCartItems = cartItems.filter((item) => item.id !== cartId);

  localStorage.setItem('cartItemList', JSON.stringify(modifiedCartItems));
};

export const clearCartItemAdditionalDataInLocalStorage = () => {
  localStorage.setItem('cartItemList', JSON.stringify([]));
};
