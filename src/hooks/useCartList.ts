import { useEffect, useState } from 'react';
import { CartInformation } from '@type/types';
import { fetchDelete, fetchPatch, fetchPost } from '@utils/fetch';
import { API_URL_CART_LIST } from '@constants/common';
import { useFetch } from './useFetch';

interface AddItemToCartProps {
  productId: number;
}

interface UpdateCartItemProps {
  cartItemId: number;
  quantity: number;
}

interface RemoveItemFromCartProps {
  cartItemId: number;
}

const useCartList = (): {
  data: CartInformation[];
  isLoading: boolean;
  error: unknown | null;
  addItemToCart: ({ productId }: AddItemToCartProps) => void;
  updateCartItem: ({ cartItemId, quantity }: UpdateCartItemProps) => void;
  removeItemFromCart: ({ cartItemId }: RemoveItemFromCartProps) => void;
} => {
  const {
    data: originData,
    isLoading,
    error,
    refreshData,
  } = useFetch<CartInformation[]>(API_URL_CART_LIST);
  const [data, setData] = useState<CartInformation[]>([]);

  useEffect(() => {
    if (!originData) return;
    const cartList = originData.map((cartItem) => {
      return {
        id: cartItem.id,
        quantity: cartItem.quantity,
        product: {
          id: cartItem.product.id,
          name: cartItem.product.name,
          price: cartItem.product.price,
          imageUrl: cartItem.product.imageUrl,
        },
      };
    });

    setData(cartList);
  }, [originData]);

  const addItemToCart = async ({ productId }: AddItemToCartProps) => {
    const response = await fetchPost<AddItemToCartProps>(API_URL_CART_LIST, {
      productId,
    });

    if (response && response.ok) {
      refreshData();
    }
  };

  const updateCartItem = async ({
    cartItemId,
    quantity,
  }: UpdateCartItemProps) => {
    const response = await fetchPatch(`${API_URL_CART_LIST}/${cartItemId}`, {
      quantity,
    });

    if (response && response.ok) {
      refreshData();
    }
  };

  const removeItemFromCart = async ({
    cartItemId,
  }: RemoveItemFromCartProps) => {
    const response = await fetchDelete(`${API_URL_CART_LIST}/${cartItemId}`);

    if (response && response.ok) {
      refreshData();
    }
  };

  return {
    data,
    isLoading,
    error,
    addItemToCart,
    updateCartItem,
    removeItemFromCart,
  };
};

export default useCartList;
