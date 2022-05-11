import { ADD_PRODUCT_TO_CART } from "./actions";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_PRODUCT_TO_CART: {
      const newState = structuredClone(state);
      const id = payload;
      if (newState.cart[id]) {
        newState.cart[id] += 1;
      } else {
        newState.cart[id] = 1;
      }
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
