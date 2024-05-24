import { useRecoilState, useRecoilValue } from 'recoil';

import { cartItemListState } from '../../recoil/cartItem/atom';
import { cartItemListQuery } from '../../recoil/cartItem/selector';

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
