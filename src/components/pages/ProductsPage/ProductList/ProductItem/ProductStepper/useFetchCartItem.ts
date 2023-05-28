import { useState } from 'react';

import fetchApis from '@apis/fetchApis';

export const useFetchCartItem = (id: number, initCartItemId: string | null) => {
  const { postData, patchData, deleteData } = fetchApis();
  const [cartItemId, setCartItemId] = useState<string | null>(
    initCartItemId ?? null
  );

  const addCartItem = async () => {
    const location = await postData({ productId: id }, '/cart-items', '');

    setCartItemId(location);
  };

  const updateCartItemQuantity = async (newQuantity: number) => {
    if (!cartItemId) return;

    await patchData({ quantity: newQuantity }, '/cart-items', cartItemId);
  };

  const deleteCartItem = async (newQuantity: number) => {
    if (!cartItemId) return;

    if (newQuantity > 0) {
      updateCartItemQuantity(newQuantity);

      return;
    }

    await deleteData('/cart-items', cartItemId);
  };

  return { addCartItem, updateCartItemQuantity, deleteCartItem };
};
