import axios from 'axios';

import { ACTION_TYPE } from '../../../constants';

// actions
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

export const handleCartButtonClick = async (product, cartItems, dispatch) => {
  if (window.confirm('장바구니에 담으시겠습니까?')) {
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
              type: 'ADD_INITIAL_PRODUCT_TO_CART',
              payload: { product, cartId: cart_id },
            });
          });
        return;
      }

      dispatch({ type: ACTION_TYPE.PRODUCTS.ADD_TO_CART, payload: product });
    } catch (error) {
      console.error(error.message);
    }
  }

  return;
};
