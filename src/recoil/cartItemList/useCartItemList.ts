import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartItemListState, cartItemListQuery } from './cartItemListSelector';
import { getCartItemList, requestDeleteCartItem } from '../../apis/cartItemList/cartItemList';

const useCartItemList = () => {
  const cartItemList = useRecoilValue(cartItemListState);
  const setCartItemList = useSetRecoilState(cartItemListQuery);

  const updateCartItemList = async () => {
    const cartItemList = await getCartItemList();

    setCartItemList(cartItemList);
  };

  const deleteCartItem = async (cartItemId: number) => {
    await requestDeleteCartItem(cartItemId);

    setCartItemList(cartItemList.filter((item) => item.cartItemId !== cartItemId));
  };

  return {
    deleteCartItem,
    updateCartItemList,
  };
};

export default useCartItemList;
