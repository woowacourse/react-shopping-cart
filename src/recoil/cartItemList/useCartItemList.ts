import { useRecoilState } from 'recoil';
import { cartItemListState } from './cartItemListSelector';
import { requestDeleteCartItem } from '../../apis/cartItemList/cartItemList';
import { useCartItemSelectedIdList } from '../cartItem/useCartItemSelectedIdList';

const useCartItemList = () => {
  const [cartItemList, setCartItemList] = useRecoilState(cartItemListState);
  const { removeSelectedId } = useCartItemSelectedIdList();

  const deleteCartItem = async (cartItemId: number) => {
    await requestDeleteCartItem(cartItemId);

    setCartItemList(cartItemList.filter((item) => item.cartItemId !== cartItemId));
    removeSelectedId(cartItemId);
  };

  return {
    deleteCartItem,
  };
};

export default useCartItemList;
