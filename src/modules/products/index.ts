import { AxiosResponse } from "axios";
import { RootState } from "..";
import * as productAPI from "../../api";
import { LOAD_ITEM_AMOUNT } from "../../constants";
import { ProductType } from "../../types/product";
import createReducer from "../createReducer";
import { AppThunk } from "../type";

import { Products, ProductsListActionType } from "./type";

const GET_PRODUCTS = "products/GET_PRODUCTS" as const;
const GET_PRODUCTS_SUCCESS = "products/GET_PRODUCTS_SUCCESS" as const;
const GET_PRODUCTS_ERROR = "products/GET_PRODUCTS_ERROR" as const;
const GET_PRODUCTS_END = "products/GET_PRODUCTS_END" as const;

const INITIAL_STATE: Products = {
  isLoading: false,
  data: [],
  error: null,
  isEnd: false,
  page: 1,
};

export const getProductsByPage =
  (): AppThunk => async (dispatch, getState: () => RootState) => {
    const {
      products: { isLoading, page },
    } = getState();

    if (isLoading) return;

    dispatch({ type: ProductsListActionType.GET_PRODUCTS });

    try {
      const products: AxiosResponse<ProductType[]> =
        await productAPI.getProductsByPage(page);

      if (products.data.length < LOAD_ITEM_AMOUNT) {
        return dispatch({
          type: ProductsListActionType.GET_PRODUCTS_END,
          products: products.data,
        });
      }
      dispatch({
        type: ProductsListActionType.GET_PRODUCTS_SUCCESS,
        products: products.data,
      });
    } catch (error: any) {
      dispatch({ type: ProductsListActionType.GET_PRODUCTS_ERROR, error });
    }
  };

const getProducts = (productsState: Products) => ({
  ...productsState,
  isLoading: true,
  error: null,
});

const getProductsSuccess = (productsState: Products, action: any) => ({
  isLoading: false,
  data: productsState.data.concat(action.products),
  error: null,
  isEnd: false,
  page: productsState.page + 1,
});

const getProductsError = (productsState: Products, action: any) => ({
  ...productsState,
  isLoading: false,
  data: [],
  error: action.error,
});

const getProductsEnd = (productsState: Products, action: any) => ({
  ...productsState,
  data: productsState.data.concat(action.products),
  isLoading: false,
  isEnd: true,
});

export const productsReducer = createReducer<Products>(INITIAL_STATE, {
  [GET_PRODUCTS]: getProducts,
  [GET_PRODUCTS_SUCCESS]: getProductsSuccess,
  [GET_PRODUCTS_ERROR]: getProductsError,
  [GET_PRODUCTS_END]: getProductsEnd,
});
