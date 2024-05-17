import { useRecoilValue, useSetRecoilState } from 'recoil';
import { requestCartItemList, requestDeleteCartItem } from '../../apis/cartItemList/cartItemList';
import { cartItemListAtom, cartItemListQuery } from './states';

const useCartItemList = () => {
  const setCartItemList = useSetRecoilState(cartItemListQuery);
  const cartItemList = useRecoilValue(cartItemListAtom);

  const updateCartItemList = async () => {
    const updatedCartItemList = await requestCartItemList();

    setCartItemList(updatedCartItemList);
  };

  const deleteCartItem = async (cartItemId: number) => {
    await requestDeleteCartItem(cartItemId);

    const newCartItemList = cartItemList.filter((cartItem) => cartItem.cartItemId !== cartItemId);
    setCartItemList(newCartItemList);
  };

  return { updateCartItemList, deleteCartItem };
};

export default useCartItemList;
