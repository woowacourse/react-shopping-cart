export const INIT_CART_LIST = 'cart/INIT_CART_LIST';

export const ADD_ITEM = 'cart/ADD_ITEM';
export const MINUS_ITEM = 'cart/MINUS_ITEM';

export const DELETE_ITEM = 'cart/DELETE_ITEM';
export const DELETE_CHECKED_ITEM = 'cart/DELETE_CHECKED_ITEM';
export const DELETE_TOTAL_ITEM = 'cart/DELETE_TOTAL_ITEM';

export const TOGGLE_CHECK_ITEM = 'cart/CHECK_ITEM';
export const TOGGLE_TOTAL_CHECK = 'cart/TOGGLE_TOTAL_CHECK';

export const initCartList = () => async (dispatch) => {
  try {
    const response = await loadCartList();
    if (!response.ok) {
      throw new Error(response);
    }
    const db = await response.json();
    dispatch({ type: INIT_CART_LIST, cartList: db.cartList });
  } catch (e) {
    return;
  }
};

export const addCartItem = (id) => async (dispatch) => {
  await dispatch({ type: ADD_ITEM, payload: { id } });
};

export const minusCartItem = (id) => (dispatch) => {
  dispatch({ type: MINUS_ITEM, payload: { id } });
};

export const deleteCartItem = (id) => (dispatch) => {
  dispatch({ type: DELETE_ITEM, payload: { id } });
};

export const deleteCheckedItem = () => (dispatch) => {
  dispatch({ type: DELETE_CHECKED_ITEM });
};

export const deleteTotalItem = () => (dispatch) => {
  dispatch({ type: DELETE_TOTAL_ITEM });
};

export const toggleCheckItem = (id) => (dispatch) => {
  dispatch({ type: TOGGLE_CHECK_ITEM, payload: { id } });
};

export const toggleTotalCheck = () => (dispatch) => {
  dispatch({ type: TOGGLE_TOTAL_CHECK });
};

export const loadCartList = async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cartList`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

const initialState = {
  cartList: [],
};

const cartReducer = (state = initialState, action) => {
  if (action.type === INIT_CART_LIST) {
    const cartList = action.payload.cartList;
    return {
      ...state,
      cartList: cartList,
    };
  }

  if (action.type === ADD_ITEM) {
    const productId = action.payload.id;
    if (state.cartList.length === 0) {
      return {
        ...state,
        cartList: state.cartList.concat({ id: productId, quantity: 1, isChecked: false }),
      };
    }
    const existIndex = state.cartList.findIndex((product) => product.id === Number(productId));
    if (existIndex === -1) {
      return {
        ...state,
        cartList: state.cartList.concat({ id: productId, quantity: 1, isChecked: false }),
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
    return {
      ...state,
      cartList: state.cartList.filter((product) => !product.isChecked),
    };
  }

  if (action.type === DELETE_TOTAL_ITEM) {
    return {
      cartList: [],
    };
  }

  if (action.type === TOGGLE_CHECK_ITEM) {
    const productId = action.payload.id;
    return {
      ...state,
      cartList: state.cartList.map((product) =>
        product.id === productId ? { ...product, isChecked: !product.isChecked } : product,
      ),
    };
  }

  if (action.type === TOGGLE_TOTAL_CHECK) {
    const isTotalChecked = state.cartList.reduce((prev, cur) => cur.isChecked && prev, true);
    return {
      ...state,
      cartList: state.cartList.map((product) => {
        return { ...product, isChecked: !isTotalChecked };
      }),
    };
  }
  return state;
};

export default cartReducer;
