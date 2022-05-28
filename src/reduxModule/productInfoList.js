const INIT_PRODUCT_INFO_LIST = 'productInfoList/INIT_PRODUCT_LIST';

export const getProductInfoList = () => async (dispatch) => {
  try {
    const response = await loadProductInfoList();
    if (!response.ok) {
      throw new Error(response);
    }
    const db = await response.json();
    dispatch({ type: INIT_PRODUCT_INFO_LIST, productInfoList: db });
  } catch (e) {
    return;
  }
};

const loadProductInfoList = async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/productInfoList`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

const initialState = {
  productInfoList: [],
};

const productInfoListReducer = (state = initialState, action) => {
  if (action.type === INIT_PRODUCT_INFO_LIST) {
    const productInfoList = action.productInfoList;
    return {
      productInfoList: productInfoList,
    };
  }
  return state;
};

export default productInfoListReducer;
