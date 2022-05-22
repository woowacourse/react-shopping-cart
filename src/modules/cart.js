export const ADD_ITEM = 'cart/ADD_ITEM';
export const MINUS_ITEM = 'cart/MINUS_ITEM';
export const DELETE_ITEM = 'cart/DELETE_ITEM';
export const DELETE_CHECKED_ITEM = 'cart/DELETE_CHECKED_ITEM';

export const addCartItem = (id) => (dispatch) => {
  dispatch({ type: ADD_ITEM, payload: { id } });
};

export const minusCartItem = (id) => (dispatch) => {
  dispatch({ type: MINUS_ITEM, payload: { id } });
};

export const deleteCartItem = (id) => (dispatch) => {
  dispatch({ type: DELETE_ITEM, payload: { id } });
};

export const deleteCheckedItem = (checkedList) => (dispatch) => {
  dispatch({ type: DELETE_CHECKED_ITEM, payload: { checkedList: checkedList } });
};

const initialState = {
  cartList: [],
};

const cartReducer = (state = initialState, action) => {
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
  if (action.type === MINUS_ITEM) {
    const productId = action.payload.id;
    const existIndex = state.cartList.findIndex((product) => product.id === Number(productId));
    const existQuantity = state.cartList[existIndex].quantity;
    if (existQuantity === 1) {
      return {
        ...state,
        cartList: state.cartList.filter((product) => product.id !== productId),
      };
    }
    return {
      ...state,
      cartList: state.cartList.map((product, index) =>
        index === existIndex ? { ...product, quantity: existQuantity - 1 } : product,
      ),
    };
  }
  if (action.type === DELETE_ITEM) {
    const productId = action.payload.id;
    return {
      ...state,
      cartList: state.cartList.filter((product) => product.id !== productId),
    };
  }
  if (action.type === DELETE_CHECKED_ITEM) {
    const checkedList = action.payload.checkedList;

    return {
      ...state,
      cartList: state.cartList.filter((product) => !checkedList.includes(product.id)),
    };
  }
  return state;
};

export default cartReducer;
