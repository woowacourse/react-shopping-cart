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
    default: {
      return state;
    }
  }
};

export default reducer;
