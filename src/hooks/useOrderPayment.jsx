import { useDispatch } from 'react-redux';
import { API_PATH } from '../constants/api';
import { httpClient } from '../request/httpClient';

const useOrderPayment = () => {
  const dispatch = useDispatch();

  const requestOrderItemListInsert = (orderItemList) => async () => {
    try {
      const orderItemData = orderItemList.map(({ cart_id, quantity }) => ({ cart_id, quantity }));

      await httpClient.post({ path: API_PATH.ORDER_ITEM_LIST, body: orderItemData });
    } catch (error) {
      console.error(error);
    }
  };

  const insertOrderItemList = async (orderItemList) => {
    await dispatch(requestOrderItemListInsert(orderItemList));
  };

  return { insertOrderItemList };
};

export default useOrderPayment;
