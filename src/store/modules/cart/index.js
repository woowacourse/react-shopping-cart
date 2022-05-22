import { actionTypes } from './actionTypes';

const initialState = {
  products: [],
  checkedIds: [],
  count: 0,
  orderDetail: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CART_PRODUCT_LIST:
      return {
        ...state,
        products: action.payload,
        count: action.payload.length,
        checkedIds: action.payload.map((product) => product.id),
        orderDetail: action.payload.reduce((target, product) => {
          target[product.id] = {
            id: product.id,
            quantity: 1,
            price: product.price,
            paymentAmount: product.price,
          };

          return target;
        }, {}),
      };
    case actionTypes.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        products: state.products.concat(action.payload),
        count: state.count + 1,
        checkedIds: [...state.checkedIds, action.payload.id],
      };
    case actionTypes.REMOVE_PRODUCT_TO_CART:
      return {
        ...state,
        products: state.products.filter(({ id }) => id !== action.payload),
        count: state.count - 1,
        checkedIds: state.checkedIds.filter((id) => id !== action.payload),
      };
    case actionTypes.REMOVE_PRODUCTS_TO_CART:
      return {
        ...state,
        // TODO
        // products: state.products.filter(({ id }) => id !== action.payload),
        // count: state.count - 1,
        // checkedIds: state.checkedIds.filter((id) => id !== action.payload),
      };
    case actionTypes.CHECK:
      return {
        ...state,
        checkedIds: [...state.checkedIds, action.payload],
      };
    case actionTypes.UN_CHECK:
      return {
        ...state,
        checkedIds: state.checkedIds.filter((id) => id !== action.payload),
      };
    case actionTypes.ALL_CHECK:
      return {
        ...state,
        checkedIds: state.products.map((product) => product.id),
      };
    case actionTypes.ALL_UN_CHECK:
      return {
        ...state,
        checkedIds: [],
      };
    case actionTypes.ORDER_DETAIL:
      const _orderDetail = { ...state.orderDetail };
      _orderDetail[`${action.payload.id}`] = action.payload;

      return {
        ...state,
        orderDetail: {
          ..._orderDetail,
        },
      };
    default:
      return state;
  }
}

export default reducer;
