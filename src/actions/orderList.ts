import { ActionType, createAction } from 'typesafe-actions';
import { OrderList, RequestError } from '../interface';

const orderList = {
  get: {
    request: createAction('orderList/get/request')(),
    success: createAction(
      'orderList/get/success',
      (orderList: OrderList) => orderList
    )<OrderList>(),
    failure: createAction(
      'orderList/get/failure',
      (requestErrorMessage: RequestError) => requestErrorMessage
    )<RequestError>(),
  },
};

type orderListActionType = ActionType<typeof orderList.get>;

export default orderList;
export { orderListActionType };
