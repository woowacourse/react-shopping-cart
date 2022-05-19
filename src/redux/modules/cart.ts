import { AppDispatch, RootState } from "../store";

type CartItemDetail = { name: string; price: number; img: string; id: number };
export type CartItem = { amount: number; isSelected: boolean; detail: CartItemDetail };
type CartState = { cartItemList: CartItem[] };
type Action =
  | ReturnType<typeof addItem>
  | ReturnType<typeof deleteItem>
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
  | ReturnType<typeof incrementByNumber>
  | ReturnType<typeof toggleItemSelected>;

// initialState
const initialState: CartState = {
  cartItemList: [],
};

// 액션
const ADD = "cart/ADD" as const;
const DELETE = "cart/DELETE" as const;
const INCREMENT = "cart/INCREMENT" as const;
const DECREMENT = "cart/DECREMENT" as const;
const INCREMENT_BY_NUMBER = "cart/INCREMENT_BY_NUMBER" as const;
const TOGGLE_ITEM_SELECTED = "cart/SELECT" as const;

// 액션 크리에터
const addItem = (detail: CartItemDetail) => ({
  type: ADD,
  payload: { detail },
});
const deleteItem = (id: number) => ({
  type: DELETE,
  payload: { id },
});
const increment = (id: number) => ({
  type: INCREMENT,
  payload: { id },
});
const decrement = (id: number) => ({
  type: DECREMENT,
  payload: { id },
});
const incrementByNumber = (id: number, number: number) => ({
  type: INCREMENT_BY_NUMBER,
  payload: { id, number },
});
const toggleItemSelected = (id: number, toggleKey: boolean) => ({
  type: TOGGLE_ITEM_SELECTED,
  payload: { id, toggleKey },
});

// thunk
const toggleAllItemsSelected =
  (toggleKey: boolean): any =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { cartItemList } = getState().cart;
    cartItemList.map((cartItem) => dispatch(toggleItemSelected(cartItem.detail.id, toggleKey)));
  };

const deleteSelectedItems = (): any => (dispatch: AppDispatch, getState: () => RootState) => {
  const { cartItemList } = getState().cart;
  cartItemList.map((cartItem) => {
    if (cartItem.isSelected) dispatch(deleteItem(cartItem.detail.id));
  });
};

// 리듀서
const cartReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD: {
      const { detail } = action.payload;
      const newCartItemList = [...state.cartItemList, { isSelected: false, amount: 1, detail }];

      return { cartItemList: newCartItemList };
    }
    case DELETE: {
      const { id } = action.payload;
      const newCartItemList = state.cartItemList.filter((cartItem) => cartItem.detail.id !== id);

      return { cartItemList: newCartItemList };
    }
    case INCREMENT: {
      const { id } = action.payload;
      const targetIndex = state.cartItemList.findIndex((cartItem) => cartItem.detail.id === id);
      const newCartItemList = [...state.cartItemList];
      newCartItemList[targetIndex].amount++;

      return { cartItemList: newCartItemList };
    }
    case DECREMENT: {
      const { id } = action.payload;
      const targetIndex = state.cartItemList.findIndex((cartItem) => cartItem.detail.id === id);
      const newCartItemList = [...state.cartItemList];
      newCartItemList[targetIndex].amount--;

      return { cartItemList: newCartItemList };
    }
    case INCREMENT_BY_NUMBER: {
      const { id, number } = action.payload;
      const targetIndex = state.cartItemList.findIndex((cartItem) => cartItem.detail.id === id);
      const newCartItemList = [...state.cartItemList];
      newCartItemList[targetIndex].amount += number;

      return { cartItemList: newCartItemList };
    }
    case TOGGLE_ITEM_SELECTED: {
      const { id, toggleKey } = action.payload;
      const targetIndex = state.cartItemList.findIndex((cartItem) => cartItem.detail.id === id);
      const newCartItemList = [...state.cartItemList];
      newCartItemList[targetIndex].isSelected = toggleKey;

      return { cartItemList: newCartItemList };
    }
    default:
      return state;
  }
};

export const actionCreators = {
  addItem,
  deleteItem,
  deleteSelectedItems,
  increment,
  decrement,
  incrementByNumber,
  toggleItemSelected,
  toggleAllItemsSelected,
};

export default cartReducer;
