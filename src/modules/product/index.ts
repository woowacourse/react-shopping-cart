import { product } from "../../types/product";
import * as productAPI from "../../api";
import createReducer from "../createReducer";
import { AxiosResponse } from "axios";
import { Product, ProductActionType } from "./type";
import { AppThunk } from "../thunk";

const GET_PRODUCT = "product/GET_PRODUCT" as const;
const GET_PRODUCT_SUCCESS = "product/GET_PRODUCT_SUCCESS" as const;
const GET_PRODUCT_ERROR = "product/GET_PRODUCT_ERROR" as const;

const INITIAL_STATE: Product = {
  isLoading: false,
  data: {},
  error: null,
};

export const getProductById =
  (id: number): AppThunk =>
  async (dispatch) => {
    dispatch({ type: ProductActionType.GET_PRODUCT });
    try {
      const product: AxiosResponse<product> = await productAPI.getProductById(
        id
      );
      dispatch({
        type: ProductActionType.GET_PRODUCT_SUCCESS,
        product: product.data,
      });
    } catch (error: any) {
      dispatch({ type: ProductActionType.GET_PRODUCT_ERROR, error });
    }
  };

const getProduct = () => ({
  isLoading: true,
  data: {},
  error: null,
});

const getProductSuccess = (_: product, action: any) => {
  return {
    isLoading: false,
    data: action.product,
    error: null,
  };
};

const getProductError = () => ({
  isLoading: false,
  data: {},
  error: null,
});

export const productReducer = createReducer(INITIAL_STATE, {
  [GET_PRODUCT]: getProduct,
  [GET_PRODUCT_SUCCESS]: getProductSuccess,
  [GET_PRODUCT_ERROR]: getProductError,
});
