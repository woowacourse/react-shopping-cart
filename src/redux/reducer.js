import ACTION_TYPE from "@redux/actions";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.ADD_PRODUCT_TO_CART: {
      const newState = structuredClone(state);
      const id = payload;
      if (newState.cart[id]) {
        newState.cart[id] += 1;
      } else {
        newState.cart[id] = 1;
      }
      localStorage.setItem("cart", JSON.stringify(newState.cart));
      return newState;
    }
    case ACTION_TYPE.UPDATE_PRODUCT_LIST: {
      const newState = structuredClone(state);
      newState.productList = payload;
      return newState;
    }
    case ACTION_TYPE.SELECT_PRODUCT_IN_CART: {
      const newState = structuredClone(state);
      const productId = payload;
      newState.cart[productId].selected = true;
      return newState;
    }
    case ACTION_TYPE.DESELECT_PRODUCT_IN_CART: {
      const newState = structuredClone(state);
      const productId = payload;
      newState.cart[productId].selected = false;
      return newState;
    }
    case ACTION_TYPE.SELECT_ALL_PRODUCTS_IN_CART: {
      const newState = structuredClone(state);
      Object.keys(newState.cart).forEach((productId) => {
        newState.cart[productId].selected = true;
      });
      return newState;
    }
    case ACTION_TYPE.DESELECT_ALL_PRODUCTS_IN_CART: {
      const newState = structuredClone(state);
      Object.keys(newState.cart).forEach((productId) => {
        newState.cart[productId].selected = false;
      });
      return newState;
    }
    case ACTION_TYPE.UPDATE_PRODUCT_QUANTITY_IN_CART: {
      const newState = structuredClone(state);
      const { productId, quantity } = payload;
      newState.cart[productId].quantity = quantity;
      return newState;
    }
    case ACTION_TYPE.DELETE_PRODUCT_IN_CART: {
      const newState = structuredClone(state);
      const productId = payload;
      delete newState.cart[productId];
      return newState;
    }
    case ACTION_TYPE.DELETE_MULTIPLE_PRODUCTS_IN_CART: {
      const newState = structuredClone(state);
      const productIds = payload;
      productIds.forEach((id) => {
        delete newState.cart[id];
      });
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
