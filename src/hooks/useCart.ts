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
    onSuccess: (res) => {
      const updatedCheckCart = checkCartList.filter((checkCartItemId) =>
        res.find((cart) => cart.id === checkCartItemId),
      );
      setCheckCartList(updatedCheckCart);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const changeCartItemQuantity = useMutation(
    async ({ cartId, body }: { cartId: number; body: ChangeCartQuantityAPIRequestBody }) =>
      await fetch(`/cart-items/${cartId}`, { method: 'PATCH', body: JSON.stringify(body) }),
    {
      onError: (e) => {
        alert('서버와의 통신에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        console.log(e);
      },
    },
  );

  const deleteCartItem = useMutation(
    async ({ cartId }: { cartId: number }) => {
      await fetch(`/cart-items/${cartId}`, { method: 'DELETE' });
    },
    {
      onError: (e) => {
        alert('서버와의 통신에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
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
      onError: (e) => {
        alert('서버와의 통신에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        console.log(e);
      },
    },
  );

  const addCartItemAPI = (body: AddCartAPIRequestBody, onSuccessMethod: () => void) => {
    const onSuccess = (res: Response) => {
      const cartId = Number(res.headers.get('Location')?.split('/')[2]);
      if (cartId) {
        setCheckCartList((prev) => [...prev, cartId]);
      }
      onSuccessMethod();
      refetch();
    };

    fetchAddCartItem.mutate({ body }, { onSuccess });
  };

  const changeCartQuantityAPI = (
    cartId: number,
    body: ChangeCartQuantityAPIRequestBody,
    onSuccessMethod: () => void,
  ) => {
    const onSuccess = () => {
      onSuccessMethod();
      refetch();
    };
    changeCartItemQuantity.mutate({ cartId, body }, { onSuccess });
  };

  const deleteCartItemAPI = (cartId: number, onSuccessMethod?: () => void) => {
    const onSuccess = () => {
      onSuccessMethod && onSuccessMethod();
      refetch();
    };
    deleteCartItem.mutate({ cartId }, { onSuccess });
  };

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
