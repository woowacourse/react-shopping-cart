import axios from "axios";
import { BASE_URL } from "@/constants";
import {
  ADD_PRODUCT_TO_CART,
  GET_PRODUCT_LIST_ERROR,
  GET_PRODUCT_LIST_START,
  GET_PRODUCT_LIST_SUCCESS,
  TOGGLE_CART_ITEM_CHECK_BUTTON,
  UNCHECK_ALL_CHECK_BUTTON,
  CHECK_ALL_CHECK_BUTTON,
} from "./types";
import createAction from "./createAction";

export const getProductList = () => async (dispatch) => {
  try {
    dispatch(createAction(GET_PRODUCT_LIST_START));
    const productList = await axios.get(`${BASE_URL}/products`);
    dispatch(createAction(GET_PRODUCT_LIST_SUCCESS, productList.data));
  } catch (error) {
    dispatch(createAction(GET_PRODUCT_LIST_ERROR, error));
  }
};

export const addProductToCart = (args) => async (dispatch) => {
  const { id, name, price, imgUrl } = args;
  dispatch(createAction(ADD_PRODUCT_TO_CART, { id, name, price, imgUrl }));
};

export const toggleCartItemCheckButton = (id) => async (dispatch) => {
  dispatch(createAction(TOGGLE_CART_ITEM_CHECK_BUTTON, id));
};

export const uncheckAllCheckButton = () => async (dispatch) => {
  dispatch(createAction(UNCHECK_ALL_CHECK_BUTTON));
};

export const checkAllCheckButton = () => async (dispatch) => {
  dispatch(createAction(CHECK_ALL_CHECK_BUTTON));
};
