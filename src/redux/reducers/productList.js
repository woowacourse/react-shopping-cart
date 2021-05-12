import { UPDATE_PRODUCT_ITEMS } from '../actionType';

const initState = {
  productList: [],
};

const productListReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_ITEMS: {
      return { ...state, productList: action.productItems };
    }

    default:
      return state;
  }
};

export default productListReducer;
