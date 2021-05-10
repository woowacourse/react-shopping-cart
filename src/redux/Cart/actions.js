export const ADD_TO_CART_SUCCESS = 'cart/add_to_cart/success';
export const ADD_TO_CART_ERROR = 'cart/add_to_cart/error';

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART_SUCCESS,
    product,
  };
};
