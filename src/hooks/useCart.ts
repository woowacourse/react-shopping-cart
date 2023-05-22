import { CartItem } from '../types/types';
import { useMutation, useQuery } from 'react-query';

export const useCart = () => {
  const fetchCartData = async () => {
    const res = await fetch('/cart-items', { method: 'get' });
    const data = await res.json();
    return data;
  };

  const { data, refetch } = useQuery<CartItem[]>('cart', fetchCartData, {
    onError: (e) => {
      console.log(e);
    },
  });

  const mutateCartData = useMutation(
    async ({
      method,
      cartId,
      body,
    }: {
      method: 'delete' | 'patch';
      cartId: number;
      body?: object;
    }) => await fetch(`/cart-items/${cartId}`, { method, body: JSON.stringify(body) }),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const fetchAddCartItem = useMutation(
    async ({ body }: { body?: object }) =>
      await fetch(`/cart-items`, { method: 'post', body: JSON.stringify(body) }),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const addCartItemAPI = (body?: object) => {
    console.log('??');
    fetchAddCartItem.mutate({ body });
  };

  const changeCartQuantityAPI = (cartId: number, body?: object) =>
    mutateCartData.mutate({ method: 'patch', cartId, body });

  const deleteCartItemAPI = (cartId: number) => mutateCartData.mutate({ method: 'delete', cartId });

  return {
    data,
    refetch,
    addCartItemAPI,
    changeCartQuantityAPI,
    deleteCartItemAPI,
  };
};
