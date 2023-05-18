import { useRecoilState, useSetRecoilState } from 'recoil';
import { $CartIdList, $CartItemState, $CheckedCartIdList, $ToastMessageList } from '../recoil/atom';
import useMutationQuery from './useMutationQuery';
import type { CartItem, Product } from '../types';

const useCart = (id: number) => {
  const { mutateQuery, loading, error } = useMutationQuery<Record<string, number>, CartItem>('/cart-items');
  const [cartItemState, setCartItemState] = useRecoilState($CartItemState(id));
  const setCheckedCartIdList = useSetRecoilState($CheckedCartIdList);
  const [cartIdList, setCartIdList] = useRecoilState($CartIdList);
  const setMessageList = useSetRecoilState($ToastMessageList);

  const addQuantity = async (quantity: number) => {
    if (cartItemState) {
      await mutateQuery('PATCH', { quantity: cartItemState.quantity + quantity }, String(id));
    }
    setCartItemState(prev => prev && { id, quantity: prev.quantity + quantity, product: prev.product });
  };

  const deleteCartItem = async () => {
    await mutateQuery('DELETE', undefined, String(id));
    setCartIdList(prev => prev.filter(item => item !== id));
    setCheckedCartIdList(prev => prev.filter(item => item !== id));
    setCartItemState(null);

    if (!(loading || error)) {
      setMessageList(prev => [...prev, '장바구니에서 삭제되었습니다.']);
    }
  };

  const addCartItem = async (product: Product) => {
    await mutateQuery('POST', { productId: id });
    setCartIdList(prev => [...prev, id]);
    setCheckedCartIdList(prev => [...prev, id]);
    setCartItemState({ id, quantity: 1, product });

    if (!(loading || error)) {
      setMessageList(prev => [...prev, '장바구니에 등록되었습니다.']);
    }
  };

  return { cartIdList, cartItemState, addQuantity, deleteCartItem, addCartItem };
};

export default useCart;
