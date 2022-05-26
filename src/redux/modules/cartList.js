import createAction from "@/redux/createAction";

export const ACTION_TYPES = {
  ADD_PRODUCT_TO_CART: "ADD_PRODUCT_TO_CART",
  TOGGLE_CART_ITEM_CHECK_BUTTON: "TOGGLE_CART_ITEM_CHECK_BUTTON",
  UNCHECK_ALL_CHECK_BUTTON: "UNCHECK_ALL_CHECK_BUTTON",
  CHECK_ALL_CHECK_BUTTON: "CHECK_ALL_CHECK_BUTTON",
  INCREMENT_CART_ITEM_QUANTITY: "INCREMENT_CART_ITEM_QUANTITY",
  DECREMENT_CART_ITEM_QUANTITY: "DECREMENT_CART_ITEM_QUANTITY",
  REMOVE_CHECKED_CART_ITEM: "REMOVE_CHECKED_CART_ITEM",
  REMOVE_ROW_CART_ITEM: "REMOVE_ROW_CART_ITEM",
};

export const addProductToCart = (args) => async (dispatch) => {
  const { id, name, price, imgUrl } = args;
  dispatch(
    createAction(ACTION_TYPES.ADD_PRODUCT_TO_CART, { id, name, price, imgUrl })
  );
};
export const toggleCartItemCheckButton = (id) => async (dispatch) => {
  dispatch(createAction(ACTION_TYPES.TOGGLE_CART_ITEM_CHECK_BUTTON, id));
};
export const uncheckAllCheckButton = () => async (dispatch) => {
  dispatch(createAction(ACTION_TYPES.UNCHECK_ALL_CHECK_BUTTON));
};
export const checkAllCheckButton = () => async (dispatch) => {
  dispatch(createAction(ACTION_TYPES.CHECK_ALL_CHECK_BUTTON));
};
export const incrementCartItemQuantity = (id) => async (dispatch) => {
  dispatch(createAction(ACTION_TYPES.INCREMENT_CART_ITEM_QUANTITY, id));
};
export const decrementCartItemQuantity = (id) => async (dispatch) => {
  dispatch(createAction(ACTION_TYPES.DECREMENT_CART_ITEM_QUANTITY, id));
};
export const removeCheckedCartItem = () => async (dispatch) => {
  dispatch(createAction(ACTION_TYPES.REMOVE_CHECKED_CART_ITEM));
};
export const removeRowCartItem = (id) => async (dispatch) => {
  dispatch(createAction(ACTION_TYPES.REMOVE_ROW_CART_ITEM, id));
};

const cartListInitialState = [];

export const cartListReducer = (state = cartListInitialState, action) => {
  const newState = [...state];

  switch (action.type) {
    case ACTION_TYPES.ADD_PRODUCT_TO_CART:
      const isExistInCart = state.some((item) => {
        return item.id === action.payload.id;
      });

      if (isExistInCart) {
        return state;
      }
      return [...state, { ...action.payload, quantity: 1, checked: true }];

    case ACTION_TYPES.TOGGLE_CART_ITEM_CHECK_BUTTON:
      const selectedItem = newState.find((item) => item.id === action.payload);
      const selectedItemIndex = newState.indexOf(selectedItem);

      newState[selectedItemIndex].checked =
        !newState[selectedItemIndex].checked;

      return newState;

    case ACTION_TYPES.UNCHECK_ALL_CHECK_BUTTON:
      const allUnCheckedState = newState.map((item) => {
        return item.checked === true
          ? { ...item, checked: false }
          : { ...item };
      });

      return allUnCheckedState;

    case ACTION_TYPES.CHECK_ALL_CHECK_BUTTON:
      const allCheckedState = newState.map((item) => {
        return item.checked === false
          ? { ...item, checked: true }
          : { ...item };
      });

      return allCheckedState;

    case ACTION_TYPES.INCREMENT_CART_ITEM_QUANTITY:
      const incrementState = newState.map((item) => {
        return item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : { ...item };
      });

      return incrementState;

    case ACTION_TYPES.DECREMENT_CART_ITEM_QUANTITY:
      const decrementState = newState.map((item) => {
        return item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
            }
          : { ...item };
      });

      return decrementState;

    case ACTION_TYPES.REMOVE_CHECKED_CART_ITEM:
      const checkedItemRemovedState = newState.filter((item) => {
        return item.checked === false;
      });
      return checkedItemRemovedState;

    case ACTION_TYPES.REMOVE_ROW_CART_ITEM:
      const rowItemRemovedState = newState.filter((item) => {
        return item.id !== action.payload;
      });

      return rowItemRemovedState;

    default:
      return state;
  }
};
