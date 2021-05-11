export const GET_PRODUCTS_SUCCESS = 'product_list/get_products/success';
export const GET_PRODUCTS_ERROR = 'product_list/get_products/error';
export const RESET_PRODUCTS = 'product_list/reset_products';

export const getProducts = () => (dispatch, getState) => {
  fetch('https://raw.githubusercontent.com/SunYoungKwon/react-shopping-cart/step1/src/mockData.json')
    .then((response) => response.json())
    .then((data) =>
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: data,
      })
    )
    .catch((e) =>
      dispatch({
        type: GET_PRODUCTS_ERROR,
        error: e,
      })
    );
};

export const resetProducts = () => {
  return {
    type: RESET_PRODUCTS,
  };
};
