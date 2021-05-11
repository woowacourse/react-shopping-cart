const FETCH_PRODUCT_LIST = 'product/FETCH_PRODUCT_LIST';

export const fetchProductList = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:4000/productList');
    const productList = await response.json();

    dispatch({ type: FETCH_PRODUCT_LIST, payload: productList });
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  productList: [],
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload,
      };
    default:
      return state;
  }
};

export default product;
