import { UPDATE_CHECKED_PRODUCT_ITEMS } from '../actionType';

const initState = {
  checkedProductList: [],
};

const checkedProductReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_CHECKED_PRODUCT_ITEMS: {
      return {
        ...state,
        checkedProductList: action.productItems,
      };
    }

    default:
      return state;
  }
};

export default checkedProductReducer;
