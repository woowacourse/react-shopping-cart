import { Cart, Product } from 'types/index';

const cartTypes = {
  ADD_PRODUCT: 'ADD_PRODUCT_TO_CART',
  DELETE_PRODUCT: 'DELETE_PRODUCT_TO_CART',
  DELETE_CHECKED_PRODUCT: 'DELETE_CHECKED_PRODUCT_TO_CART',
  TOGGLE_CHECK_ONE: 'TOGGLE_CHECK_A_PRODUCT',
  TOGGLE_CHECK_ALL: 'TOGGLE_CHECK_ALL_PRODUCT',
  CHANGE_PRODUCT_STOCK: 'CHANGE_PRODUCT_STOCK',
} as const;

const cartActions = {
  addToCart: (data: Product['id']) => {
    return { type: cartTypes.ADD_PRODUCT, payload: data };
  },
  deleteToCart: (data: Product['id']) => {
    return { type: cartTypes.DELETE_PRODUCT, payload: data };
  },
  deleteCheckedToCart: () => {
    return { type: cartTypes.DELETE_CHECKED_PRODUCT };
  },
  toggleCheckAProduct: (data: Product['id']) => {
    return { type: cartTypes.TOGGLE_CHECK_ONE, payload: data };
  },
  toggleCheckAllProduct: (checked: boolean) => {
    return { type: cartTypes.TOGGLE_CHECK_ALL, payload: checked };
  },
  changeProductStock: (data: Pick<Cart, 'id' | 'stock'>) => {
    return { type: cartTypes.CHANGE_PRODUCT_STOCK, payload: data };
  },
};

export { cartTypes, cartActions };
