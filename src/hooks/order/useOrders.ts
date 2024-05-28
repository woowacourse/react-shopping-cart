import { useRecoilState } from 'recoil';

import { requestOrders } from '../../apis/orders';
import useApiErrorState from '../error/useApiErrorState';
import { FailedOrderError } from '../../error/customError';
import { selectedCartItemIdListState } from '../../recoil/cartItem/atom';

const useOrder = () => {
  const [selectedCartItemIdList] = useRecoilState(selectedCartItemIdListState);
  const { setApiError } = useApiErrorState();

  const orderSelectedCartItems = async () => {
    try {
      await requestOrders(selectedCartItemIdList);
    } catch (error) {
      setApiError(new FailedOrderError());
    }
  };

  return { orderSelectedCartItems };
};

export default useOrder;
