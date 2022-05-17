import { Product } from 'types';

const productTypes = {
  GET_PRODUCT_LIST: 'GET_PRODUCT',
  GET_PRODUCT_LIST_SUCCESS: 'GET_PRODUCT_SUCCESS',
  GET_PRODUCT_LIST_ERROR: 'GET_PRODUCT_ERROR',
  GET_PRODUCT_DETAIL: 'GET_PRODUCT_DETAIL',
  GET_PRODUCT_DETAIL_SUCCESS: 'GET_PRODUCT_DETAIL_SUCCESS',
  GET_PRODUCT_DETAIL_ERROR: 'GET_PRODUCT_DETAIL_ERROR',
} as const;

const productActions = {
  getProductList: () => {
    return { type: productTypes.GET_PRODUCT_LIST };
  },
  getProductListSuccess: (data: Array<Product>) => {
    return { type: productTypes.GET_PRODUCT_LIST_SUCCESS, payload: data };
  },
  getProductListError: () => {
    return { type: productTypes.GET_PRODUCT_LIST_ERROR };
  },
  getProductDetail: () => {
    return { type: productTypes.GET_PRODUCT_DETAIL };
  },
  getProductDetailSuccess: (data: Product) => {
    return { type: productTypes.GET_PRODUCT_DETAIL_SUCCESS, payload: data };
  },
  getProductDetailError: () => {
    return { type: productTypes.GET_PRODUCT_DETAIL_ERROR };
  },
};

const cartTypes = {
  ADD_PRODUCT: 'ADD_PRODUCT_TO_CART',
} as const;

const cartActions = {
  addToCart: (data: Product['id']) => {
    return { type: cartTypes.ADD_PRODUCT, payload: data };
  },
};

export { productTypes, productActions, cartTypes, cartActions };
