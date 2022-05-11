import cartsActionTypes from "./carts.types";

const INITIAL_STATE = {
  loading: false,
  carts: [],
  error: false,
};

const cartsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartsActionTypes.fetchCartsStart:
      return {
        ...state,
        loading: true,
      };
    case cartsActionTypes.fetchCartsSuccess:
      return {
        error: null,
        loading: false,
        carts: action.payload,
      };
    case cartsActionTypes.fetchCartsError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case cartsActionTypes.addProductToCartStart:
      return {
        ...state,
        loading: true,
      };
    case cartsActionTypes.addProductToCartSuccess:
      return {
        ...state,
        loading: false,
        carts: state.carts.concat(action.payload),
      };
    case cartsActionTypes.addProductToCartError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case cartsActionTypes.deleteProductToCartStart:
      return {
        ...state,
        loading: true,
      };
    case cartsActionTypes.deleteProductToCartSuccess:
      return {
        ...state,
        loading: false,
        carts: state.carts.filter((cart) => cart.id !== action.payload),
      };
    case cartsActionTypes.deleteProductToCartError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case cartsActionTypes.toggleIsChecked: {
      const currentCartProduct = state.carts.find(
        (carts) => carts.id === action.payload
      );
      currentCartProduct["checked"] = !currentCartProduct["checked"];
      return { ...state };
    }
    case cartsActionTypes.increaseProductQuantity: {
      const currentCartProduct = state.carts.find(
        (carts) => carts.id === action.payload
      );
      currentCartProduct["quantity"] = currentCartProduct["quantity"]
        ? currentCartProduct["quantity"] + 1
        : 1;
      return { ...state };
    }
    case cartsActionTypes.decreaseProductQuantity: {
      const currentCartProduct = state.carts.find(
        (carts) => carts.id === action.payload
      );
      if (currentCartProduct["quantity"] === 0) {
        return { ...state };
      }
      currentCartProduct["quantity"] = currentCartProduct["quantity"]
        ? currentCartProduct["quantity"] - 1
        : 1;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default cartsReducer;
