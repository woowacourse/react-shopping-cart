import { useRecoilState, useRecoilValue } from 'recoil';
import { cartItemListQuery, cartItemListState } from './cartItemListSelector';
import { requestDeleteCartItem } from '../../apis/cartItemList/cartItemList';
import { useCartItemSelectedIdList } from '../cartItem/useCartItemSelectedIdList';

const useCartItemList = () => {
  const [cartItemList, setCartItemList] = useRecoilState(cartItemListState);
  const { removeSelectedId } = useCartItemSelectedIdList();

  const deleteCartItem = async (cartItemId: number) => {
    await requestDeleteCartItem(cartItemId);

    setCartItemList(cartItemList.filter((item) => item.id !== cartItemId));
    removeSelectedId(cartItemId);
  };

  const fetchCartItemList = () => {
    if (cartItemList.length === 0) {
      setCartItemList(useRecoilValue(cartItemListQuery));
    }
  };

  return {
    cartItemList,
    setCartItemList,
    deleteCartItem,
    fetchCartItemList,
  };
};

export default useCartItemList;
