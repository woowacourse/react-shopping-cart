import { useRecoilState, useSetRecoilState } from 'recoil';
import { MESSAGE } from '../constants';
import { $CartIdList, $CheckedCartIdList } from '../recoil/atom';
import useGetQuery from './useGetQuery';
import useMutation from './useMutation';
import useToast from './useToast';
import type { CartItem } from '../types';

const useCart = () => {
  const Toast = useToast();
  const [cartIdList, setCartIdList] = useRecoilState($CartIdList);
  const setCheckedCartIdList = useSetRecoilState($CheckedCartIdList);
  const { data: cartItemStateList, refreshQuery, loading } = useGetQuery<CartItem[]>('/cart-items');
  const addCartQuery = useMutation<Record<string, number>, CartItem>({
    onSuccess: data => {
      const regex = /[^0-9]/g;
      const cartId = data?.headers.get('Location')?.replace(regex, '');
      setCartIdList(prev => [...prev, Number(cartId)]);
      setCheckedCartIdList(prev => [...prev, Number(cartId)]);
      Toast.success(MESSAGE.ADD_CART_SUCCESSFUL);
      refreshQuery();
    },
    onFailure: () => {
      Toast.error(MESSAGE.ADD_CART_FAILED);
    },
  });
  const deleteCartQuery = useMutation<Record<string, number>, CartItem>({
    onSuccess: data => {
      const regex = /[^0-9]/g;
      const cartId = data?.headers.get('Location')?.replace(regex, '');
      setCartIdList(prev => prev.filter(item => item !== Number(cartId)));
      setCheckedCartIdList(prev => prev.filter(item => item !== Number(cartId)));
      Toast.success(MESSAGE.DELETE_CART_SUCCESSFUL);
      refreshQuery();
    },
    onFailure: () => {
      Toast.error(MESSAGE.DELETE_CART_FAILED);
    },
  });
  const mutateQuantityQuery = useMutation<Record<string, number>, CartItem>({
    onSuccess: () => {
      refreshQuery();
    },
    onFailure: () => {
      Toast.error(MESSAGE.MUTATE_CART_FAILED);
    },
  });

  const mutateQuantity = async (cartId: number, quantity: number) => {
    await mutateQuantityQuery({
      url: `/cart-items/${cartId}`,
      method: 'PATCH',
      bodyData: { quantity },
    });
  };

  const deleteCartItem = async (cartId: number) => {
    await deleteCartQuery({
      url: `/cart-items/${cartId}`,
      method: 'DELETE',
    });
  };

  const addCartItem = async (productId: number) => {
    await addCartQuery({
      url: `/cart-items`,
      method: 'POST',
      bodyData: { productId },
    });
  };

  return { cartIdList, cartItemStateList, mutateQuantity, deleteCartItem, addCartItem, refreshQuery, loading };
};

export default useCart;
