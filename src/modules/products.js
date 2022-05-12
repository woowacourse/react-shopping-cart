import * as productAPI from "../api";

const GET_PRODUCTS = "products/GET_PRODUCTS";
const GET_PRODUCT = "product/GET_PRODUCT";

const GET_PRODUCT_SUCCESS = "product/GET_PRODUCT_SUCCESS";
const GET_PRODUCTS_SUCCESS = "products/GET_PRODUCTS_SUCCESS";

const GET_PRODUCT_ERROR = "product/GET_PRODUCT_ERROR";
const GET_PRODUCTS_ERROR = "products/GET_PRODUCTS_ERROR";
const GET_PRODUCTS_END = "products/GET_PRODUCTS_END";

export const getProductsByPage = () => async (dispatch, getState) => {
  dispatch({ type: GET_PRODUCTS });

  try {
    const products = await productAPI.getProductsByPage(
      getState().products.page
    );

    if (products.data.length < 10) {
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
    const product = await productAPI.getProductById(id);
    dispatch({ type: GET_PRODUCT_SUCCESS, product: product.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_ERROR, error });
  }
};

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
};

function getProducts(productsState) {
  return {
    ...productsState,
    loading: true,
    error: null,
  };
}

function getProductsSuccess(productsState, action) {
  return {
    loading: false,
    data: productsState.data.concat(action.products),
    error: null,
    isEnd: false,
    page: productsState.page + 1,
  };
}

function getProductsError(productsState, action) {
  return {
    ...productsState,
    loading: false,
    data: null,
    error: action.error,
  };
}

function getProductsEnd(productsState, action) {
  return {
    ...productsState,
    data: productsState.data.concat(action.products),
    loading: false,
    isEnd: true,
  };
}

function getProduct() {
  return {
    loading: true,
    data: {},
    error: null,
  };
}

function getProductSuccess(action) {
  return {
    loading: false,
    data: action.product,
    error: null,
  };
}

function getProductError() {
  return {
    loading: false,
    data: {},
    error: null,
  };
}

function productsReducer(productsState = {}, action = {}) {
  switch (action.type) {
    case GET_PRODUCTS:
      return getProducts(productsState);
    case GET_PRODUCTS_SUCCESS:
      return getProductsSuccess(productsState, action);
    case GET_PRODUCTS_ERROR:
      return getProductsError(productsState, action);
    case GET_PRODUCTS_END:
      return getProductsEnd(productsState, action);
    default:
      return productsState;
  }
}

function productReducer(productState = {}, action = {}) {
  switch (action.type) {
    case GET_PRODUCT:
      return getProduct();
    case GET_PRODUCT_SUCCESS:
      return getProductSuccess(action);
    case GET_PRODUCT_ERROR:
      return getProductError();
    default:
      return productState;
  }
}

export default function appReducer(state = initialState, action = {}) {
  return {
    products: productsReducer(state.products, action),
    product: productReducer(state.product, action),
  };
}
