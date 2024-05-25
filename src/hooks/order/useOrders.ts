import { useRecoilState } from 'recoil';

import { requestOrders } from '../../apis/orders';
import { selectedCartItemIdListState } from '../../recoil/cartItem/atom';

const useOrder = () => {
  const [selectedCartItemIdList] = useRecoilState(selectedCartItemIdListState);

  const orderSelectedCartItems = async () => {
    await requestOrders(selectedCartItemIdList);
  };

  return { orderSelectedCartItems };
};

export default useOrder;
