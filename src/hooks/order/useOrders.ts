import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { cartItemListQuery } from '../../recoil/cartItem/selector';
import {
  cartItemListState,
  selectedCartItemIdListState,
} from '../../recoil/cartItem/atom';
import { requestOrders } from '../../apis/orders';

const useOrder = () => {
  const setCartItemList = useSetRecoilState(cartItemListState);
  const newCartItemList = useRecoilValue(cartItemListQuery);
  const [selectedCartItemIdList, setSelectedCartItemIdList] = useRecoilState(
    selectedCartItemIdListState,
  );

  const orderSelectedCartItems = async () => {
    await requestOrders(selectedCartItemIdList);
  };

  return { orderSelectedCartItems };
};

export default useOrder;
