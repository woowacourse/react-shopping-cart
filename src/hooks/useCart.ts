import { useRecoilState, useSetRecoilState } from 'recoil';
import { $CartIdList, $CheckedCartIdList } from '../recoil/atom';
import useGetQuery from './useGetQuery';
import useMutation from './useMutation';
import useToast from './useToast';
import type { CartItem } from '../types';

const useCart = () => {
  const Toast = useToast();
  const [cartIdList, setCartIdList] = useRecoilState($CartIdList);
  const setCheckedCartIdList = useSetRecoilState($CheckedCartIdList);
  const { data: cartItemStateList, refreshQuery } = useGetQuery<CartItem[]>('/cart-items');
  const addCartQuery = useMutation<Record<string, number>, CartItem>({
    onSuccess: data => {
      const regex = /[^0-9]/g;
      const cartId = data?.headers.get('Location')?.replace(regex, '');
      setCartIdList(prev => [...prev, Number(cartId)]);
      setCheckedCartIdList(prev => [...prev, Number(cartId)]);
      Toast.success('장바구니에 추가되었습니다.');
      refreshQuery();
    },
    onFailure: () => {
      Toast.error('장바구니에 추가하는 과정에서 에러가 발생했습니다.');
    },
  });
  const deleteCartQuery = useMutation<Record<string, number>, CartItem>({
    onSuccess: data => {
      const regex = /[^0-9]/g;
      const cartId = data?.headers.get('Location')?.replace(regex, '');
      setCartIdList(prev => prev.filter(item => item !== Number(cartId)));
      setCheckedCartIdList(prev => prev.filter(item => item !== Number(cartId)));
      Toast.success('장바구니에서 삭제하었습니다.');
      refreshQuery();
    },
    onFailure: () => {
      Toast.error('장바구니에 삭제하는 과정에서 에러가 발생했습니다.');
    },
  });
  const mutateQuantityQuery = useMutation<Record<string, number>, CartItem>({
    onSuccess: () => {
      refreshQuery();
    },
    onFailure: () => {
      Toast.error('수량을 바꾸는 과정에서 에러가 발생하였습니다.');
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

  return { cartIdList, cartItemStateList, mutateQuantity, deleteCartItem, addCartItem, refreshQuery };
};

export default useCart;
