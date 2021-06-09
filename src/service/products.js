import axios from 'axios';
import { ACTION_TYPE } from '../constants';

export const fetchProducts = () => async dispatch => {
  try {
    const response = await axios.get('/api/products');

    dispatch({
      type: ACTION_TYPE.PRODUCTS.SET_PRODUCTS,
      fetchedProducts: response.data,
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchProductDetail = match => async dispatch => {
  try {
    const response = await axios.get(
      `/api/products/${match.params.product_id}`
    );
    dispatch({
      type: ACTION_TYPE.PRODUCTS.GET_PRODUCT_DETAIL,
      productDetail: response.data,
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const addItemToCart = (product, cartItems, show) => async dispatch => {
  try {
    const sameItem = cartItems.find(
      ({ product_id }) => product_id === product.product_id
    );

    if (!sameItem) {
      await axios
        .post(`/api/customers/ddongule/carts`, {
          product_id: product.product_id,
        })
        .then(response => {
          const location = response.headers.location.split('/');
          const cart_id = location[location.length - 1];

          dispatch({
            type: ACTION_TYPE.PRODUCTS.ADD_INITIAL_PRODUCT,
            payload: { product, cartId: cart_id },
          });
        });
      show();
      return;
    }

    dispatch({ type: ACTION_TYPE.PRODUCTS.ADD_TO_CART, payload: product });
    show();
  } catch (error) {
    console.error(error.message);
  }
};
