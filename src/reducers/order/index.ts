import { Cart, RequestError } from '../../interface';
import { orderActionType } from '../../actions/order';

const initialState: RequestError = {
  requestErrorMessage: null,
};

const orderReducer = (
  state: RequestError = initialState,
  action: orderActionType
) => {
  switch (action.type) {
    case 'order/post/success':
      return {
        ...state,
        requestErrorMessage: null,
      };

    case 'order/post/failure':
      return {
        ...state,
        requestErrorMessage: action.payload.requestErrorMessage,
      };

    default:
      return state;
  }
};

export default orderReducer;
export { initialState };
