import { useRecoilState } from 'recoil';
import type { CartItemType } from '../types/types';
import { useMutation, useQuery } from 'react-query';
import { checkCartListState } from '../service/atom';

interface AddCartAPIRequestBody {
  productId: number;
}

interface ChangeCartQuantityAPIRequestBody {
  quantity: number;
}

const useCart = () => {
  const [checkCartList, setCheckCartList] = useRecoilState(checkCartListState);

  const calcTotalPrice = () => {
    return checkCartList.reduce((prev, curr) => {
      const cartItem = cartData && cartData.find((cart) => cart.id === curr);
      if (cartItem) {
        const { product, quantity } = cartItem;
        return prev + product.price * quantity;
      }
      return prev + 0;
    }, 0);
  };

  const fetchCartData = async () => {
    const res = await fetch('/cart-items', { method: 'GET' });
    const data = await res.json();
    return data;
  };

  const {
    data: cartData,
    refetch,
    isLoading,
  } = useQuery<CartItemType[]>('cart', fetchCartData, {
    onError: (e) => {
      console.log(e);
    },
  });

  const changeCartItemQuantity = useMutation(
    async ({ cartId, body }: { cartId: number; body: ChangeCartQuantityAPIRequestBody }) =>
      await fetch(`/cart-items/${cartId}`, { method: 'PATCH', body: JSON.stringify(body) }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: (e) => {
        console.log(e);
      },
    },
  );

  const deleteCartItem = useMutation(
    async ({ cartId }: { cartId: number }) => {
      await fetch(`/cart-items/${cartId}`, { method: 'DELETE' });
    },
    {
      onSuccess: () => {
        refetch();
      },
      onError: (e) => {
        console.log(e);
      },
    },
  );

  const fetchAddCartItem = useMutation(
    async ({ body }: { body: AddCartAPIRequestBody }) => {
      const res = await fetch('/cart-items', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      return res;
    },
    {
      onSuccess: async (res) => {
        const cartId = Number(res.headers.get('Location')?.split('/')[2]);
        if (cartId) {
          setCheckCartList((prev) => [...prev, cartId]);
        }
        refetch();
      },
      onError: (e) => {
        console.log(e);
      },
    },
  );

  const addCartItemAPI = (body: AddCartAPIRequestBody) => {
    fetchAddCartItem.mutate({ body });
  };

  const changeCartQuantityAPI = (cartId: number, body: ChangeCartQuantityAPIRequestBody) =>
    changeCartItemQuantity.mutate({ cartId, body });

  const deleteCartItemAPI = (cartId: number) => deleteCartItem.mutate({ cartId });

  return {
    cartData,
    refetch,
    addCartItemAPI,
    changeCartQuantityAPI,
    deleteCartItemAPI,
    calcTotalPrice: calcTotalPrice(),
    isLoading,
  };
};

export default useCart;
