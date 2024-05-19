import { useRecoilState, useRecoilValue } from 'recoil';
import { cartItemListQuery, cartItemListState } from './cartItemListSelector';
import { requestDeleteCartItem } from '../../apis/cartItemList/cartItemList';
import { useCartItemSelectedIdList } from '../cartItem/useCartItemSelectedIdList';
import { useCartItemQuantity } from '../cartItem/useCartItemQuantity';

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
      const newCartItemList = useRecoilValue(cartItemListQuery);
      setCartItemList(newCartItemList);
      newCartItemList.forEach(({ quantity, id }) => {
        const { setQuantity } = useCartItemQuantity(id);
        setQuantity(quantity);
      });
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
