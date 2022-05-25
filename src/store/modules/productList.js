export const PRODUCT_LIST = {
  INITIALIZE: 'INITIALIZE_PRODUCT_LIST',
};

const INITIAL_STATE = {
  productList: [],
};

Object.freeze(INITIAL_STATE);
Object.freeze(INITIAL_STATE.productList);

export default function productListReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PRODUCT_LIST.INITIALIZE: {
      const productList = action.payload;

      return {
        productList,
      };
    }

    default:
      return state;
  }
}
