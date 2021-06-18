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
export const REMOVE_PRODUCTS = 'REMOVE_PRODUCTS';
export const REMOVE_PRODUCTS_SUCCESS = 'REMOVE_PRODUCTS_SUCCESS';
export const REMOVE_PRODUCTS_ERROR = 'REMOVE_SELECTED_PRODUCT_ERROR';

export const TOGGLE_PRODUCT_SELECTION = 'TOGGLE_PRODUCT_SELECTION';
export const TOGGLE_ALL_PRODUCTS_SELECTION = 'TOGGLE_ALL_PRODUCTS_SELECTION';

export const INCREMENT_PRODUCT_QUANTITY = 'INCREMENT_PRODUCT_QUANTITY';
export const DECREMENT_PRODUCT_QUANTITY = 'DECREMENT_PRODUCT_QUANTITY';
export const INPUT_PRODUCT_QUANTITY = 'INPUT_PRODUCT_QUANTITY';

export const CLEAR_ERROR = 'CLEAR_ERROR';

/* ACTION CREATOR */

export const cartAction = {
  getProducts: () => async (dispatch) => {
    dispatch({ type: GET_PRODUCTS });
    try {
      const params = getFetchParams({ path: PATH.CART });
      const response = await request.get(params);

      if (response.ok) {
        const cartList = await response.json();

        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: { cartList } });
      }
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
      const response = await request.post(params);

      if (response.ok) {
        dispatch({ type: ADD_PRODUCT_SUCCESS, payload: { product } });
      }
    } catch (e) {
      console.error(e);
      dispatch({ type: ADD_PRODUCT_ERROR });
    }
  },
  removeProduct: (id) => async (dispatch) => {
    dispatch({ type: REMOVE_PRODUCT });
    try {
      const params = getFetchParams({ path: `${PATH.CART}/${id}` });
      const response = await request.delete(params);

      if (response.ok) {
        dispatch({ type: REMOVE_PRODUCT_SUCCESS, payload: { id } });
      }
    } catch (e) {
      console.error(e);
      dispatch({ type: REMOVE_PRODUCT_ERROR });
    }
  },
  removeProducts: (ids) => async (dispatch) => {
    dispatch({ type: REMOVE_PRODUCTS });
    try {
      const response = await Promise.all(
        ids.map((id) => {
          const params = getFetchParams({ path: `${PATH.CART}/${id}` });

          return request.delete(params);
        })
      );

      if (response.every(({ ok }) => ok)) {
        dispatch({ type: REMOVE_PRODUCTS_SUCCESS, payload: { ids } });
      }
    } catch (e) {
      console.error(e);
      dispatch({ type: REMOVE_PRODUCTS_ERROR });
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

  clearError: () => ({ type: CLEAR_ERROR }),
};

/* REDUCER */

export const INITIAL_STATE = {
  isLoading: false,
  isError: false,
  products: {},
};

export const INITIAL_CART_PRODUCT_PROPS = {
  quantity: 1,
  isSelected: true,
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  const { type = '', payload = '' } = action;

  switch (type) {
    /* payload: { cartListEntries } */
    case GET_PRODUCTS:
      return { ...state, isLoading: true };
    case GET_PRODUCTS_SUCCESS:
      const cartListEntries = payload.cartList.map(({ cart_id, price, name, image_url }) => [
        cart_id,
        { id: cart_id, price, name, img: image_url, ...INITIAL_CART_PRODUCT_PROPS },
      ]);
      return {
        ...state,
        isLoading: false,
        products: Object.fromEntries(cartListEntries),
      };
    case GET_PRODUCTS_ERROR:
      return { ...state, isLoading: false, isError: true };

    /* payload: { product } */
    case ADD_PRODUCT:
      return { ...state, isLoading: true };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: {
          ...state.products,
          [payload.product.id]: { ...payload.product, ...INITIAL_CART_PRODUCT_PROPS },
        },
      };
    case ADD_PRODUCT_ERROR:
      return { ...state, isLoading: false, isError: true };

    /* payload: { id } */
    case REMOVE_PRODUCT:
      return { ...state, isLoading: true };
    case REMOVE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: getPropertyRemoved({ ...state.products }, payload.id),
      };
    case REMOVE_PRODUCT_ERROR:
      return { ...state, isLoading: false, isError: true };

    case REMOVE_PRODUCTS:
      return { ...state, isLoading: true };
    case REMOVE_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: getPropertyRemoved({ ...state.products }, payload.ids),
      };
    case REMOVE_PRODUCTS_ERROR:
      return { ...state, isLoading: false, isError: true };

    /* payload: { id } */
    case TOGGLE_PRODUCT_SELECTION:
      const willBeSelected = !state.products[payload.id].isSelected;
      return {
        ...state,
        products: {
          ...state.products,
          [payload.id]: { ...state.products[payload.id], isSelected: willBeSelected },
        },
      };

    /* payload: { willBeSelected } */
    case TOGGLE_ALL_PRODUCTS_SELECTION:
      return {
        ...state,
        products: Object.entries(state.products).reduce(
          (acc, [id]) => {
            acc[id].isSelected = payload.willBeSelected;
            return acc;
          },
          { ...state.products }
        ),
      };

    /* payload: { id } */
    case INCREMENT_PRODUCT_QUANTITY:
      const incrementedQuantity = state.products[payload.id].quantity + 1;
      return {
        ...state,
        products: {
          ...state.products,
          [payload.id]: { ...state.products[payload.id], quantity: incrementedQuantity },
        },
      };

    /* payload: { id } */
    case DECREMENT_PRODUCT_QUANTITY:
      const decrementedQuantity = state.products[payload.id].quantity - 1;
      return {
        ...state,
        products: {
          ...state.products,
          [payload.id]: { ...state.products[payload.id], quantity: decrementedQuantity },
        },
      };

    /* payload: { id, quantity } */
    case INPUT_PRODUCT_QUANTITY:
      return {
        ...state,
        products: {
          ...state.products,
          [payload.id]: { ...state.products[payload.id], quantity: payload.quantity },
        },
      };

    default:
      return state;
  }
};
