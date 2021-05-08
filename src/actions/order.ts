import { createAction, ActionType } from 'typesafe-actions';

import { Order, RequestError } from '../interface';

const order = {
  post: {
    request: createAction(
      'order/post/request',
      (order: Order) => order
    )<Order>(),
    success: createAction('order/post/success')(),
    failure: createAction(
      'order/post/failure',
      (requestErrorMessage: RequestError) => requestErrorMessage
    )<RequestError>(),
  },
};

// TODO: 타입 추상화
type orderActionType = ActionType<typeof order.post>;
type orderPostActionType = ActionType<typeof order.post>;

export default order;
export { orderActionType, orderPostActionType };
