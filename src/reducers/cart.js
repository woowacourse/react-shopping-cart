const initialState = {
  carts: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'UPDATE_CART_LIST':
      return { ...state, carts: [...state.carts, ...payload] };

    default:
      return state;
  }
};
