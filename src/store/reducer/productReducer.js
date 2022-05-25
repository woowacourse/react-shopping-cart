import { PRODUCT_ACTION_TYPE } from 'store/action/productActions';

const initialState = {
  productList: [],
  selectedProductId: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_ACTION_TYPE.UPDATE_PRODUCT_LIST:
      return {
        ...state,
        productList: state.productList.concat(action.payload.productList),
      };
    case PRODUCT_ACTION_TYPE.CLEAR_PRODUCT_LIST:
      return {
        ...state,
        productList: [],
      };
    case PRODUCT_ACTION_TYPE.SELECT_PRODUCT:
      return {
        ...state,
        selectedProductId: action.payload.id,
      };
    default:
      return state;
  }
};

export default productReducer;
