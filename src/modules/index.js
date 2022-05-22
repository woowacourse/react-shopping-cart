import shoppingCartProductsReducer from "./cartProducts";
import checkedProductIdsReducer from "./checkedIds";
import productReducer from "./product";
import productsReducer from "./products";
import snackBarStateReducer from "./snackBar";

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
  checkedProductIds: [],
  snackBarState: {
    message: "",
    isOpen: false,
    duration: 0,
    isSuccess: false,
  },
};

export default function appReducer(state = initialState, action = {}) {
  return {
    products: productsReducer(state.products, action),
    product: productReducer(state.product, action),
    shoppingCartProducts: shoppingCartProductsReducer(
      state.shoppingCartProducts,
      action
    ),
    checkedProductIds: checkedProductIdsReducer(
      state.checkedProductIds,
      action
    ),
    snackBarState: snackBarStateReducer(state.snackBarState, action),
  };
}
