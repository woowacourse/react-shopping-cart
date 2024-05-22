import { useRecoilState, useRecoilValue } from 'recoil';
import { cartItemListQuery, cartItemListState } from './cartItemListSelector';

const useFetchCartItemList = () => {
  const [cartItemList, setCartItemList] = useRecoilState(cartItemListState);
  const newCartItemList = useRecoilValue(cartItemListQuery);

  const fetchCartItemList = () => {
    if (cartItemList.length === 0) {
      setCartItemList(newCartItemList);
    }
  };

  return { fetchCartItemList };
};

export default useFetchCartItemList;
