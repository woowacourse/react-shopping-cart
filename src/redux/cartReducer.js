import { getPropertyRemoved } from '../utils';
import { PATH, request, getFetchParams } from '../request';

/* ACTION TYPE */
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_ERROR = 'ADD_PRODUCT_ERROR';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const REMOVE_PRODUCT_SUCCESS = 'REMOVE_PRODUCT_SUCCESS';
export const REMOVE_PRODUCT_ERROR = 'REMOVE_PRODUCT_ERROR';
export const REMOVE_SELECTED_PRODUCTS = 'REMOVE_SELECTED_PRODUCTS';
export const REMOVE_SELECTED_PRODUCTS_SUCCESS = 'REMOVE_SELECTED_PRODUCTS_SUCCESS';
export const REMOVE_SELECTED_PRODUCTS_ERROR = 'REMOVE_SELECTED_PRODUCT_ERROR';

export const TOGGLE_PRODUCT_SELECTION = 'TOGGLE_PRODUCT_SELECTION';
export const TOGGLE_ALL_PRODUCTS_SELECTION = 'TOGGLE_ALL_PRODUCTS_SELECTION';

export const INCREMENT_PRODUCT_QUANTITY = 'INCREMENT_PRODUCT_QUANTITY';
export const DECREMENT_PRODUCT_QUANTITY = 'DECREMENT_PRODUCT_QUANTITY';
export const INPUT_PRODUCT_QUANTITY = 'INPUT_PRODUCT_QUANTITY';

/* ACTION CREATOR */

export const cartAction = {
  getProducts: () => async (dispatch) => {
    dispatch({ type: GET_PRODUCTS });
    try {
      const params = getFetchParams({ path: PATH.CART });
      const response = await request.get(params);
      const cartList = await response.json();

      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: { cartList } });
    } catch (e) {
      console.error(e);
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  },
  addProduct: (product) => async (dispatch) => {
    dispatch({ type: ADD_PRODUCT });
    try {
      const body = { product_id: product.id };
      const params = getFetchParams({ path: PATH.CART, body });

      await request.post(params);

      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: { product } });
    } catch (e) {
      console.error(e);
      dispatch({ type: ADD_PRODUCT_ERROR });
    }
  },
  removeProduct: (id) => async (dispatch) => {
    dispatch({ type: REMOVE_PRODUCT });
    try {
      const params = getFetchParams({ path: `${PATH.CART}/${id}` });

      await request.delete(params);

      dispatch({ type: REMOVE_PRODUCT_SUCCESS, payload: { id } });
    } catch (e) {
      console.error(e);
      dispatch({ type: REMOVE_PRODUCT_ERROR });
    }
  },
  // removeSelectedProducts: () => ({ type: REMOVE_SELECTED_PRODUCTS }),
  removeSelectedProducts: (selectedProducts) => async (dispatch) => {
    dispatch({ type: REMOVE_SELECTED_PRODUCTS });
    try {
      selectedProducts.forEach(async ({ id }) => {
        const params = getFetchParams({ path: `${PATH.CART}/${id}` });

        await request.delete(params);
      });

      dispatch({ type: REMOVE_SELECTED_PRODUCTS_SUCCESS });
    } catch (e) {
      console.error(e);
      dispatch({ type: REMOVE_SELECTED_PRODUCTS_ERROR });
    }
  },

  toggleProductSelection: (id) => ({ type: TOGGLE_PRODUCT_SELECTION, payload: { id } }),
  toggleAllProductsSelection: (willBeSelected) => ({
    type: TOGGLE_ALL_PRODUCTS_SELECTION,
    payload: { willBeSelected },
  }),

  incrementProductQuantity: (id) => ({ type: INCREMENT_PRODUCT_QUANTITY, payload: { id } }),
  decrementProductQuantity: (id) => ({ type: DECREMENT_PRODUCT_QUANTITY, payload: { id } }),
  inputProductQuantity: (id, quantity) => ({
    type: INPUT_PRODUCT_QUANTITY,
    payload: { id, quantity },
  }),
};

/* REDUCER */

export const INITIAL_STATE = {};

export const INITIAL_CART_PRODUCT_PROPS = {
  quantity: 1,
  isSelected: true,
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  const { type = '', payload = '' } = action;

  switch (type) {
    /* payload: { cartListEntries } */
    case GET_PRODUCTS:
      return { ...state };
    case GET_PRODUCTS_SUCCESS:
      const cartListEntries = payload.cartList.map(({ cart_id, price, name, image_url }) => [
        cart_id,
        { id: cart_id, price, name, img: image_url, ...INITIAL_CART_PRODUCT_PROPS },
      ]);
      return Object.fromEntries(cartListEntries);
    case GET_PRODUCTS_ERROR:
      return { ...state };

    /* payload: { product } */
    case ADD_PRODUCT:
      return { ...state };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        [payload.product.id]: { ...payload.product, ...INITIAL_CART_PRODUCT_PROPS },
      };
    case ADD_PRODUCT_ERROR:
      return { ...state };

    /* payload: { id } */
    case REMOVE_PRODUCT:
      return { ...state };
    case REMOVE_PRODUCT_SUCCESS:
      return getPropertyRemoved({ ...state }, payload.id);
    case REMOVE_PRODUCT_ERROR:
      return { ...state };

    case REMOVE_SELECTED_PRODUCTS:
      return { ...state };
    case REMOVE_SELECTED_PRODUCTS_SUCCESS:
      const notRemovedProducts = Object.entries(state).filter(
        ([_, product]) => !product.isSelected
      );
      return Object.fromEntries(notRemovedProducts);
    case REMOVE_SELECTED_PRODUCTS_ERROR:
      return { ...state };

    /* payload: { id } */
    case TOGGLE_PRODUCT_SELECTION:
      const willBeSelected = !state[payload.id].isSelected;
      return { ...state, [payload.id]: { ...state[payload.id], isSelected: willBeSelected } };

    /* payload: { willBeSelected } */
    case TOGGLE_ALL_PRODUCTS_SELECTION:
      return Object.entries(state).reduce(
        (acc, [id]) => {
          acc[id].isSelected = payload.willBeSelected;
          return acc;
        },
        { ...state }
      );

    /* payload: { id } */
    case INCREMENT_PRODUCT_QUANTITY:
      const incrementedQuantity = state[payload.id].quantity + 1;
      return { ...state, [payload.id]: { ...state[payload.id], quantity: incrementedQuantity } };

    /* payload: { id } */
    case DECREMENT_PRODUCT_QUANTITY:
      const decrementedQuantity = state[payload.id].quantity - 1;
      return { ...state, [payload.id]: { ...state[payload.id], quantity: decrementedQuantity } };

    /* payload: { id, quantity } */
    case INPUT_PRODUCT_QUANTITY:
      return { ...state, [payload.id]: { ...state[payload.id], quantity: payload.quantity } };

    default:
      return state;
  }
};
