import { useRecoilState, useRecoilValue } from 'recoil';
import { cartItemListQuery, cartItemListState } from './cartItemListSelector';
import { useCartItemQuantity } from '../cartItem/useCartItemQuantity';

const useFetchCartItemList = () => {
  const [cartItemList, setCartItemList] = useRecoilState(cartItemListState);
  const newCartItemList = useRecoilValue(cartItemListQuery);

  const fetchCartItemList = () => {
    if (cartItemList.length === 0) {
      setCartItemList(newCartItemList);
      newCartItemList.forEach(({ quantity, id }) => {
        const { setQuantity } = useCartItemQuantity(id);
        setQuantity(quantity);
      });
    }
  };

  return { fetchCartItemList };
};

export default useFetchCartItemList;
