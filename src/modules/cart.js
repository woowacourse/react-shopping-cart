const ADD_ITEM = 'cart/ADD_ITEM';
const DELETE_ITEM = 'cart/DELETE_ITEM';
const MODIFY_ITEM = 'cart/MODIFY_ITEM';

export const addCartItem = (id) => (dispatch) => {
  dispatch({ type: ADD_ITEM, payload: { id } });
};

const initialState = {
  cartList: [],
};

const cartReducer = (state = initialState, action) => {
  console.log(state);
  if (action.type === ADD_ITEM) {
    const productId = action.payload.id;
    if (state.cartList.length === 0) {
      return {
        ...state,
        cartList: state.cartList.concat({ id: productId, quantity: 1 }),
      };
    }
    const existIndex = state.cartList.findIndex((product) => product.id === Number(productId));
    if (existIndex === -1) {
      return {
        ...state,
        cartList: state.cartList.concat({ id: productId, quantity: 1 }),
      };
    }
    const preQuantity = state.cartList[existIndex].quantity;
    return {
      ...state,
      cartList: state.cartList.map((product, index) =>
        index === existIndex ? { ...product, quantity: preQuantity + 1 } : product,
      ),
    };
  }
  if (action.type === DELETE_ITEM) {
    return {
      ...state,
    };
  }
  if (action.type === MODIFY_ITEM) {
    return {
      ...state,
    };
  }
  return state;
};

export default cartReducer;
