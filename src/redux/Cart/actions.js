import { API_URL } from '../../constants/api';
import { ERROR_MESSAGE } from '../../constants/message';
import { cartConverter } from '../../utils/converter';

export const GET_CART_PENDING = 'cart/get_cart/pending';
export const GET_CART_SUCCESS = 'cart/get_cart/success';
export const GET_CART_ERROR = 'cart/get_cart/error';
export const RESET_CART = 'cart/reset_cart';

export const ADD_TO_CART_PENDING = 'cart/add_to_cart/pending';
export const ADD_TO_CART_SUCCESS = 'cart/add_to_cart/success';
export const ADD_TO_CART_ERROR = 'cart/add_to_cart/error';

export const TOGGLE_CART_CHECKBOX = 'cart/toggle_cart_checkbox';
export const TOGGLE_ALL_CHECKBOXES_IN_CART = 'cart/toggle_all_checkboxes_in_cart';
export const INCREASE_AMOUNT = 'cart/increase_amount';
export const CHANGE_AMOUNT = 'cart/change_amount';

export const REMOVE_CHECKED_PRODUCTS_PENDING = 'cart/remove_checked_products/pending';
export const REMOVE_CHECKED_PRODUCTS_SUCCESS = 'cart/remove_checked_products/success';
export const REMOVE_CHECKED_PRODUCTS_ERROR = 'cart/remove_checked_products/error';

export const REMOVE_PRODUCT_PENDING = 'cart/remove_product/pending';
export const REMOVE_PRODUCT_SUCCESS = 'cart/remove_product/success';
export const REMOVE_PRODUCT_ERROR = 'cart/remove_product/error';

export const getCart = () => (dispatch, getState) => {
  dispatch({ type: GET_CART_PENDING });
  fetch(API_URL.CART)
    .then((response) => {
      if (!response.ok) {
        throw new Error(ERROR_MESSAGE.FAILED_TO_GET_CART);
      }

      return response.json();
    })
    .then((data) => {
      dispatch({
        type: GET_CART_SUCCESS,
        payload: cartConverter(data),
      });
    })
    .catch((e) =>
      dispatch({
        type: GET_CART_ERROR,
        errorMessage: e.message,
      })
    );
};

export const resetCart = () => {
  return {
    type: RESET_CART,
  };
};

export const addToCart = (product) => (dispatch, getState) => {
  dispatch({ type: ADD_TO_CART_PENDING });
  fetch(API_URL.CART, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product_id: product.product_id,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(ERROR_MESSAGE.FAILED_TO_GET_CART);
      }

      if (response.status === 201) {
        const responseLocation = response.headers.get('location');
        const cartId = responseLocation.slice(responseLocation.lastIndexOf('/') + 1);
        const cartItem = {
          amount: 1,
          cart_id: cartId,
          image_url: product.image_url,
          isChecked: true,
          name: product.name,
          price: product.price,
          product_id: product.product_id,
        };
        dispatch({
          type: ADD_TO_CART_SUCCESS,
          cartItem,
        });
      }
    })
    .catch((e) =>
      dispatch({
        type: ADD_TO_CART_ERROR,
        errorMessage: e.message,
      })
    );
};

export const toggleCartCheckbox = (productId) => {
  return {
    type: TOGGLE_CART_CHECKBOX,
    productId,
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
  await Promise.all(
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
        .catch((e) =>
          dispatch({
            type: REMOVE_PRODUCT_ERROR,
            errorMessage: e.message,
          })
        )
    )
  ).then((data) => {
    dispatch({
      type: REMOVE_PRODUCT_SUCCESS,
    });
  });
};

export const removeProduct = (productId, cartId) => (dispatch, getState) => {
  dispatch({ type: REMOVE_PRODUCT_PENDING });
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
    .then((response) => {
      dispatch({
        type: REMOVE_PRODUCT_SUCCESS,
        productId,
      });
    })
    .catch((e) =>
      dispatch({
        type: REMOVE_PRODUCT_ERROR,
        errorMessage: e.message,
      })
    );
};

export const increaseAmount = (productId) => {
  return {
    type: INCREASE_AMOUNT,
    productId,
  };
};

export const changeAmount = (productId, amount) => {
  return {
    type: CHANGE_AMOUNT,
    productId,
    amount,
  };
};
