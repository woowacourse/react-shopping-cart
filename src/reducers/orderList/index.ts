import { OrderList, Loading, RequestError } from "../../types";
import { OrderListActionType, orderListActionType } from "../../actions/orderList";

interface InitialState extends Loading, RequestError {
  orderList: OrderList;
}

const initialState: InitialState = {
  orderList: [],
  loading: false,
  requestErrorMessage: null,
};

const orderListReducer = (state: InitialState = initialState, action: OrderListActionType) => {
  switch (action.type) {
    case orderListActionType.get.request:
      return {
        ...state,
        loading: true,
      };

    case orderListActionType.get.success:
      return {
        ...state,
        orderList: [...action.payload],
        loading: false,
        requestErrorMessage: null,
      };

    case orderListActionType.get.failure:
      return {
        ...state,
        loading: false,
        requestErrorMessage: action.payload.requestErrorMessage,
      };

    case orderListActionType.item.post.request:
      return {
        ...state,
        loading: true,
      };

    case orderListActionType.item.post.success:
      return {
        ...state,
        loading: false,
        requestErrorMessage: null,
      };

    case orderListActionType.item.post.failure:
      return {
        ...state,
        loading: false,
        requestErrorMessage: action.payload.requestErrorMessage,
      };

    default:
      return state;
  }
};

export default orderListReducer;
export { initialState };
