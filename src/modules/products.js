import * as API from "../api";
import createReducer from "./createReducer";
import { LOAD_ITEM_AMOUNT } from "../constants/constants";

const GET_PRODUCT = "product/GET_PRODUCT";
const GET_PRODUCT_SUCCESS = "product/GET_PRODUCT_SUCCESS";
const GET_PRODUCT_ERROR = "product/GET_PRODUCT_ERROR";

const GET_PRODUCTS = "products/GET_PRODUCTS";
const GET_PRODUCTS_SUCCESS = "products/GET_PRODUCTS_SUCCESS";
const GET_PRODUCTS_ERROR = "products/GET_PRODUCTS_ERROR";
const GET_PRODUCTS_END = "products/GET_PRODUCTS_END";

const GET_CART_PRODUCTS = "cart-products/GET_CART_PRODUCTS";
const GET_CART_PRODUCTS_SUCCESS = "cart-products/GET_CART_PRODUCTS_SUCCESS";
const GET_CART_PRODUCTS_ERROR = "cart-products/GET_CART_PRODUCTS_ERROR";

const INCREMENT_CART_PRODUCT_QUANTITY =
  "cart-product/INCREMENT_CART_PRODUCT_QUANTITY";
const DECREMENT_CART_PRODUCT_QUANTITY =
  "cart-product/DECREMENT_CART_PRODUCT_QUANTITY";
const UPDATE_CART_PRODUCT_QUANTITY_BY_USER_INPUT =
  "cart-product/UPDATE_CART_PRODUCT_QUANTITY_BY_USER_INPUT";
const REMOVE_SHOPPING_CART_PRODUCT =
  "cart-product/REMOVE_SHOPPING_CART_PRODUCT";

const initialState = {
  product: {
    loading: false,
    data: {},
    error: null,
  },
  products: {
    loading: false,
    data: [],
    error: null,
    isEnd: false,
    page: 1,
  },
  shoppingCartProducts: {
    loading: false,
    data: [],
    error: null,
  },
};

export const removeCartProduct = (id) => async (dispatch, getState) => {
  try {
    const shoppingCartProducts = getState().shoppingCartProducts;
    const newShoppingCartProducts = shoppingCartProducts.data.filter(
      (product) => product.id !== id
    );

    await API.removeShoppingCartProduct(id);

    dispatch({ type: REMOVE_SHOPPING_CART_PRODUCT, newShoppingCartProducts });
  } catch (error) {
    dispatch({ type: GET_CART_PRODUCTS_ERROR });
  }
};

export const updateCartProductQuantityByUserInput =
  (id, currentValue) => async (dispatch, getState) => {
    try {
      if (Number(currentValue) < 1) return;

      const shoppingCartProducts = getState().shoppingCartProducts;
      const newTargetShoppingCartProduct = shoppingCartProducts.data.filter(
        (product) => product.id === id
      )[0];

      newTargetShoppingCartProduct.quantity = Number(currentValue);

      const updateShoppingCartProduct =
        await API.patchShoppingCartProductQuantity(
          id,
          newTargetShoppingCartProduct
        );

      dispatch({
        type: UPDATE_CART_PRODUCT_QUANTITY_BY_USER_INPUT,
        newShoppingCartProduct: updateShoppingCartProduct,
      });
    } catch (error) {
      dispatch({ type: GET_CART_PRODUCTS_ERROR });
    }
  };

export const incrementCartProductQuantity =
  (id) => async (dispatch, getState) => {
    try {
      const shoppingCartProducts = getState().shoppingCartProducts;
      const newTargetShoppingCartProduct = shoppingCartProducts.data.filter(
        (product) => product.id === id
      )[0];

      newTargetShoppingCartProduct.quantity += 1;

      const updateShoppingCartProduct =
        await API.patchShoppingCartProductQuantity(
          id,
          newTargetShoppingCartProduct
        );

      dispatch({
        type: INCREMENT_CART_PRODUCT_QUANTITY,
        newShoppingCartProduct: updateShoppingCartProduct,
      });
    } catch (error) {
      dispatch({ type: GET_CART_PRODUCTS_ERROR });
    }
  };

export const decrementCartProductQuantity =
  (id) => async (dispatch, getState) => {
    try {
      const shoppingCartProducts = getState().shoppingCartProducts;
      const newTargetShoppingCartProduct = shoppingCartProducts.data.filter(
        (product) => product.id === id
      )[0];

      newTargetShoppingCartProduct.quantity > 1
        ? (newTargetShoppingCartProduct.quantity -= 1)
        : (newTargetShoppingCartProduct.quantity = 1);

      const updateShoppingCartProduct =
        await API.patchShoppingCartProductQuantity(
          id,
          newTargetShoppingCartProduct
        );

      dispatch({
        type: DECREMENT_CART_PRODUCT_QUANTITY,
        newShoppingCartProduct: updateShoppingCartProduct,
      });
    } catch (error) {
      dispatch({ type: GET_CART_PRODUCTS_ERROR });
    }
  };

export const getShoppingCartProducts = () => async (dispatch) => {
  dispatch({ type: GET_CART_PRODUCTS });

  try {
    const shoppingCartProducts = await API.getShoppingCartProducts();

    dispatch({
      type: GET_CART_PRODUCTS_SUCCESS,
      shoppingCartProducts: shoppingCartProducts.data,
    });
  } catch (error) {
    dispatch({ type: GET_CART_PRODUCTS_ERROR });
  }
};

export const getProductsByPage = () => async (dispatch, getState) => {
  const {
    products: { loading, page },
  } = getState();

  if (loading) return;

  dispatch({ type: GET_PRODUCTS });

  try {
    const products = await API.getProductsByPage(page);

    if (products.data.length < LOAD_ITEM_AMOUNT) {
      return dispatch({ type: GET_PRODUCTS_END, products: products.data });
    }
    dispatch({ type: GET_PRODUCTS_SUCCESS, products: products.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_ERROR, error });
  }
};

export const getProductById = (id) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT });

  try {
    const product = await API.getProductById(id);
    dispatch({ type: GET_PRODUCT_SUCCESS, product: product.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_ERROR, error });
  }
};

const getProducts = (productsState) => ({
  ...productsState,
  loading: true,
  error: null,
});

const getProductsSuccess = (productsState, action) => ({
  loading: false,
  data: productsState.data.concat(action.products),
  error: null,
  isEnd: false,
  page: productsState.page + 1,
});

const getProductsError = (productsState) => ({
  ...productsState,
  loading: false,
  data: null,
  error: true,
});

const getProductsEnd = (productsState, action) => ({
  ...productsState,
  data: productsState.data.concat(action.products),
  loading: false,
  isEnd: true,
});

const getProduct = () => ({
  loading: true,
  data: {},
  error: null,
});

const getProductSuccess = (_, action) => ({
  loading: false,
  data: action.product,
  error: null,
});

const getProductError = () => ({
  loading: false,
  data: {},
  error: true,
});

const getCartProducts = () => ({
  loading: true,
  data: [],
  error: false,
});

const getCartProductsSuccess = (shoppingCartProducts, action) => ({
  loading: false,
  data: shoppingCartProducts.data.concat(action.shoppingCartProducts),
  error: false,
});

const getCartProductsError = () => ({
  loading: false,
  data: [],
  error: true,
});

const incrementProductQuantity = (state) => ({
  ...state,
  data: state.data,
});

const decrementProductQuantity = (state) => ({
  ...state,
  data: state.data,
});

const updateProductQuantityByUserInput = (state) => ({
  ...state,
  data: state.data,
});

const removeShoppingCartProduct = (state, action) => ({
  ...state,
  data: action.newShoppingCartProducts,
});

const productsReducer = createReducer(
  {},
  {
    [GET_PRODUCTS]: getProducts,
    [GET_PRODUCTS_SUCCESS]: getProductsSuccess,
    [GET_PRODUCTS_ERROR]: getProductsError,
    [GET_PRODUCTS_END]: getProductsEnd,
  }
);

const productReducer = createReducer(
  {},
  {
    [GET_PRODUCT]: getProduct,
    [GET_PRODUCT_SUCCESS]: getProductSuccess,
    [GET_PRODUCT_ERROR]: getProductError,
  }
);

const shoppingCartProductsReducer = createReducer(
  {},
  {
    [GET_CART_PRODUCTS]: getCartProducts,
    [GET_CART_PRODUCTS_SUCCESS]: getCartProductsSuccess,
    [GET_CART_PRODUCTS_ERROR]: getCartProductsError,
    [INCREMENT_CART_PRODUCT_QUANTITY]: incrementProductQuantity,
    [DECREMENT_CART_PRODUCT_QUANTITY]: decrementProductQuantity,
    [UPDATE_CART_PRODUCT_QUANTITY_BY_USER_INPUT]:
      updateProductQuantityByUserInput,
    [REMOVE_SHOPPING_CART_PRODUCT]: removeShoppingCartProduct,
  }
);

export default function appReducer(state = initialState, action = {}) {
  return {
    products: productsReducer(state.products, action),
    product: productReducer(state.product, action),
    shoppingCartProducts: shoppingCartProductsReducer(
      state.shoppingCartProducts,
      action
    ),
  };
}
