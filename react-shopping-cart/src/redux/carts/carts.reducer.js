import { CURRENT_USER } from "../../constants";
import cartsActionTypes from "./carts.types";

const INITIAL_STATE = {
  loading: false,
  carts: [],
  error: false,
  allChecked: false,
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
        ...state,
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
      const newCarts = [...state.carts];
      const currentCartProduct = newCarts.find(
        (carts) => carts.id === action.payload
      );
      currentCartProduct["checked"] = !currentCartProduct["checked"];

      return { ...state, carts: newCarts };
    }
    case cartsActionTypes.allToggleIsChecked: {
      const newCarts = state.carts.map((cart) => {
        if (
          cart.user === CURRENT_USER &&
          state.allChecked === !!cart["checked"]
        ) {
          cart["checked"] = !cart["checked"];
        }
        return cart;
      });
      return { ...state, carts: newCarts, allChecked: !state.allChecked };
    }
    case cartsActionTypes.increaseProductQuantity: {
      const newCarts = [...state.carts];

      const currentCartProduct = newCarts.find(
        (carts) => carts.id === action.payload
      );
      currentCartProduct["quantity"] = currentCartProduct["quantity"]
        ? currentCartProduct["quantity"] + 1
        : 2;
      return { ...state, carts: newCarts };
    }
    case cartsActionTypes.decreaseProductQuantity: {
      const newCarts = [...state.carts];
      const currentCartProduct = newCarts.find(
        (carts) => carts.id === action.payload
      );
      if (currentCartProduct["quantity"] === 0) {
        return { ...state };
      }
      currentCartProduct["quantity"] = currentCartProduct["quantity"]
        ? currentCartProduct["quantity"] - 1
        : 1;
      return { ...state, carts: newCarts };
    }
    default:
      return { ...state };
  }
};

export default cartsReducer;
