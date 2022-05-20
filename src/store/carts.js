import axios from 'axios';
import PATH from '../constants/path';

const LOAD_CARTS_START = 'carts/LOAD_START';
const LOAD_CARTS_SUCCESS = 'carts/LOAD_SUCCESS';
const LOAD_CARTS_FAIL = 'carts/LOAD_FAIL';
const LOAD_CARTS_DONE = 'carts/LOAD_DONE';
const ADD_PRODUCT_TO_CARTS = 'carts/ADD_PRODUCT';
const DELETE_PRODUCT_FROM_CARTS = 'carts/DELETE_PRODUCT';
const CHECK_ALL = 'carts/CHECK_ALL';
const CHECK_ONE = 'carts/CHECK_ONE';
const UNCHECK_ALL = 'carts/UNCHECK_ALL';
const UNCHECK_ONE = 'carts/UNCHECK_ONE';
const DELETE_CHECKED_PRODUCTS = 'carts/DELETE_CHECKED_PRODUCTS';

const initialState = {
  isLoading: false,
  carts: [],
  checkedProducts: [],
  error: null,
};

const loadCartsStart = () => ({ type: LOAD_CARTS_START });
const loadCartsSuccess = (carts) => ({
  type: LOAD_CARTS_SUCCESS,
  payload: carts,
});
const loadCartsFail = (error) => ({
  type: LOAD_CARTS_FAIL,
  payload: error,
});
const loadCartsDone = () => ({
  type: LOAD_CARTS_DONE,
});
export const addProductToCarts = (id) => ({
  type: ADD_PRODUCT_TO_CARTS,
  payload: id,
});
export const deleteProductFromCarts = (id) => ({
  type: DELETE_PRODUCT_FROM_CARTS,
  payload: id,
});
export const checkAll = () => ({
  type: CHECK_ALL,
});
export const checkOne = (id) => ({
  type: CHECK_ONE,
  payload: id,
});
export const uncheckAll = () => ({
  type: UNCHECK_ALL,
});
export const uncheckOne = (id) => ({
  type: UNCHECK_ONE,
  payload: id,
});

const cartsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CARTS_START:
      return { ...state, isLoading: true };
    case LOAD_CARTS_SUCCESS:
      return {
        ...state,
        carts: action.payload,
        checkedProducts: action.payload,
      };
    case LOAD_CARTS_FAIL:
      return { ...state, error: action.payload };
    case LOAD_CARTS_DONE:
      return { ...state, isLoading: false };
    case ADD_PRODUCT_TO_CARTS:
      return {
        ...state,
        carts: state.carts.concat({ id: action.payload, quantity: 1 }),
        checkedProducts: state.carts.concat({
          id: action.payload,
          quantity: 1,
        }),
      };
    case DELETE_PRODUCT_FROM_CARTS:
      return {
        ...state,
        carts: state.carts.filter((cart) => cart.id !== action.payload),
        checkedProducts: state.carts.filter(
          (cart) => cart.id !== action.payload
        ),
      };
    case CHECK_ALL:
      return { ...state, checkedProducts: state.carts };
    case UNCHECK_ALL:
      return { ...state, checkedProducts: [] };
    case CHECK_ONE:
      return {
        ...state,
        checkedProducts: state.checkedProducts.concat({ id: action.payload }),
      };
    case UNCHECK_ONE:
      return {
        ...state,
        checkedProducts: state.checkedProducts.filter(
          (product) => product.id !== action.payload
        ),
      };
    case DELETE_CHECKED_PRODUCTS:
      return { ...state };
    default:
      return { ...state };
  }
};

export const loadCarts = () => async (dispatch) => {
  dispatch(loadCartsStart());
  try {
    const carts = await axios(
      `${process.env.REACT_APP_SERVER_URL}/${PATH.CARTS}`
    );
    dispatch(loadCartsSuccess(carts.data));
  } catch (error) {
    dispatch(loadCartsFail(error));
  } finally {
    dispatch(loadCartsDone());
  }
};

// export const deleteCheckedProducts = () => async (dispatch) => {
//   try {
//     await axios();
//   } catch (error) {}
// };

export default cartsReducer;
