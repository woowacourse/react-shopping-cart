import axios from "axios";
import { BASE_URL } from "@/constants";
import {
  GET_PRODUCT_LIST_ERROR,
  GET_PRODUCT_LIST_START,
  GET_PRODUCT_LIST_SUCCESS,
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
