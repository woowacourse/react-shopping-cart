import { API_URL } from '../../constants/api';
import { ERROR_MESSAGE } from '../../constants/message';
import { cartConverter, snakeToCamelConverter } from '../../utils/converter';

export const GET_CART_PENDING = 'cart/get_cart/pending';
export const GET_CART_SUCCESS = 'cart/get_cart/success';
export const GET_CART_ERROR = 'cart/get_cart/error';

export const RESET_CART = 'cart/reset_cart';

export const ADD_TO_CART_PENDING = 'cart/add_to_cart/pending';
export const ADD_TO_CART_SUCCESS = 'cart/add_to_cart/success';
export const ADD_TO_CART_ERROR = 'cart/add_to_cart/error';

export const TOGGLE_CART_CHECKBOX = 'cart/toggle_cart_checkbox';
export const TOGGLE_ALL_CHECKBOXES_IN_CART = 'cart/toggle_all_checkboxes_in_cart';

export const CHANGE_QUANTITY = 'cart/change_quantity';

export const REMOVE_CHECKED_PRODUCTS_PENDING = 'cart/remove_checked_products/pending';
export const REMOVE_CHECKED_PRODUCTS_SUCCESS = 'cart/remove_checked_products/success';
export const REMOVE_CHECKED_PRODUCTS_ERROR = 'cart/remove_checked_products/error';

export const REMOVE_PRODUCT_PENDING = 'cart/remove_product/pending';
export const REMOVE_PRODUCT_SUCCESS = 'cart/remove_product/success';
export const REMOVE_PRODUCT_ERROR = 'cart/remove_product/error';

export const getCart = () => (dispatch, getState) => {
  dispatch({ type: GET_CART_PENDING });
  return fetch(API_URL.CART)
    .then((response) => {
      if (!response.ok) {
        throw new Error(ERROR_MESSAGE.FAILED_TO_GET_CART);
      }

      return response.json();
    })
    .then((data) => {
      const camelData = cartConverter(data, getState().cart.cartList).map((product) => {
        return Object.entries(product).reduce((prev, cur) => {
          const [key, value] = cur;
          prev[snakeToCamelConverter(key)] = value;
          return prev;
        }, {});
      });

      dispatch({
        type: GET_CART_SUCCESS,
        payload: camelData,
      });
    })
    .catch((e) => {
      throw e;
    });
};

export const resetCart = () => {
  return {
    type: RESET_CART,
  };
};

export const addToCart = (product) => (dispatch, getState) => {
  dispatch({ type: ADD_TO_CART_PENDING });
  return fetch(API_URL.CART, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product_id: product.productId,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(ERROR_MESSAGE.FAILED_TO_ADD_TO_CART);
      }

      if (response.status === 201) {
        const responseLocation = response.headers.get('location');
        const cartId = responseLocation.slice(responseLocation.lastIndexOf('/') + 1);
        const cartItem = {
          quantity: 1,
          cartId: Number(cartId),
          imageUrl: product.imageUrl,
          isChecked: true,
          name: product.name,
          price: product.price,
          productId: product.productId,
        };

        dispatch({
          type: ADD_TO_CART_SUCCESS,
          cartItem,
        });
      }
    })
    .catch((e) => {
      throw e;
    });
};

export const toggleCartCheckbox = (cartId) => {
  return {
    type: TOGGLE_CART_CHECKBOX,
    cartId,
  };
};

export const toggleAllCheckboxesInCart = (toCheck) => {
  return {
    type: TOGGLE_ALL_CHECKBOXES_IN_CART,
    toCheck,
  };
};

export const removeCheckedProducts = (cartIds) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_PRODUCT_PENDING });
  return await Promise.all(
    cartIds.map((cartId) =>
      fetch(`${API_URL.CART}/${cartId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(ERROR_MESSAGE.FAILED_TO_REMOVE_FROM_CART);
          }

          return response;
        })
        .catch((e) => {
          throw e;
        })
    )
  ).then((data) => {
    dispatch({
      type: REMOVE_CHECKED_PRODUCTS_SUCCESS,
    });
  });
};

export const removeProduct = (cartId) => (dispatch, getState) => {
  dispatch({ type: REMOVE_PRODUCT_PENDING });
  return fetch(`${API_URL.CART}/${cartId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(ERROR_MESSAGE.FAILED_TO_REMOVE_FROM_CART);
      }

      dispatch({
        type: REMOVE_PRODUCT_SUCCESS,
        cartId,
      });
    })
    .catch((e) => {
      throw e;
    });
};

export const changeQuantity = (cartId, quantity) => {
  return {
    type: CHANGE_QUANTITY,
    cartId,
    quantity,
  };
};
