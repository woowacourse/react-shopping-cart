type CartItemDetail = { name: string; price: number; img: string };
export type CartItem = { id: number; amount: number; detail: CartItemDetail };
type CartState = { cartItemList: CartItem[] };
type Action =
  | ReturnType<typeof addItem>
  | ReturnType<typeof deleteItem>
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
  | ReturnType<typeof incrementByNumber>;

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

// 액션 크리에터
const addItem = (id: number, detail: CartItemDetail) => ({
  type: ADD,
  payload: { id, detail },
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

// 리듀서
const cartReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD: {
      const { id, detail } = action.payload;
      const newCartItemList = [...state.cartItemList, { id, amount: 1, detail }];

      return { ...state, cartItemList: newCartItemList };
    }
    case DELETE: {
      const { id } = action.payload;
      const newCartItemList = state.cartItemList.filter((cartItem) => cartItem.id !== id);

      return { ...state, cartItemList: newCartItemList };
    }
    case INCREMENT: {
      const { id } = action.payload;
      const targetIndex = state.cartItemList.findIndex((cartItem) => cartItem.id === id);
      const newCartItemList = [...state.cartItemList];
      newCartItemList[targetIndex].amount++;

      return { ...state, cartItemList: newCartItemList };
    }
    case DECREMENT: {
      const { id } = action.payload;
      const targetIndex = state.cartItemList.findIndex((cartItem) => cartItem.id === id);
      const newCartItemList = [...state.cartItemList];
      newCartItemList[targetIndex].amount--;

      return { ...state, cartItemList: newCartItemList };
    }

    case INCREMENT_BY_NUMBER: {
      const { id, number } = action.payload;
      const targetIndex = state.cartItemList.findIndex((cartItem) => cartItem.id === id);
      const newCartItemList = [...state.cartItemList];
      newCartItemList[targetIndex].amount += number;

      return { ...state, cartItemList: newCartItemList };
    }
    default:
      return state;
  }
};

export const actionCreators = { addItem, deleteItem, increment, decrement, incrementByNumber };

export default cartReducer;
