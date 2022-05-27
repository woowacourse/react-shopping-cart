export const GET_PRODUCT_LIST = 'GET_PRODUCT_LIST';
export const GET_PRODUCT_LIST_SUCCESS = 'GET_PRODUCT_LIST_SUCCESS';
export const GET_PRODUCT_LIST_ERROR = 'GET_PRODUCT_LIST_ERROR';

const getProductList = () => ({
  type: GET_PRODUCT_LIST,
});

const getProductListSuccess = productList => ({
  type: GET_PRODUCT_LIST_SUCCESS,
  payload: {
    productList,
  },
});

const getProductListError = errorMessage => ({
  type: GET_PRODUCT_LIST_ERROR,
  payload: {
    errorMessage,
  },
});

export const fetchPostList = () => async dispatch => {
  dispatch(getProductList());

  try {
    const res = await fetch(`${process.env.REACT_APP_API_HOST}/product`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('서버 에러 발생');
    }

    const productList = await res.json();

    dispatch(getProductListSuccess(productList));
  } catch (error) {
    dispatch(getProductListError(error.message));
  }
};
