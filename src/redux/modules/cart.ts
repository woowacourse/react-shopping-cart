export type CartItem = {
  name: string;
  price: number;
  img: string;
  id: number;
  amount: number;
  isSelected: boolean;
};
export type CartState = { cartItems: CartItem[] };

type Action =
  | ReturnType<typeof addItem>
  | ReturnType<typeof deleteItem>
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
  | ReturnType<typeof incrementByNumber>;

// initialState
const initialState: CartState = {
  cartItems: [],
};

// 액션
const ADD = "cart/ADD" as const;
const DELETE = "cart/DELETE" as const;
const INCREMENT = "cart/INCREMENT" as const;
const DECREMENT = "cart/DECREMENT" as const;
const INCREMENT_BY_NUMBER = "cart/INCREMENT_BY_NUMBER" as const;

// 액션 크리에터
const addItem = (item: CartItem) => ({
  type: ADD,
  payload: { item },
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
      const { item } = action.payload;
      const newItems = [...state.cartItems, item];

      return { ...state, cartItems: newItems };
    }
    case DELETE: {
      const { id } = action.payload;
      const newItems = state.cartItems.filter((item) => item.id !== id);

      return { ...state, cartItems: newItems };
    }
    case INCREMENT: {
      const { id } = action.payload;
      const targetIndex = state.cartItems.findIndex((item) => item.id === id);
      const newItems = [...state.cartItems];
      newItems[targetIndex].amount++;

      return { ...state, cartItems: newItems };
    }
    case DECREMENT: {
      const { id } = action.payload;
      const targetIndex = state.cartItems.findIndex((item) => item.id === id);
      const newItems = [...state.cartItems];
      newItems[targetIndex].amount--;

      return { ...state, cartItems: newItems };
    }
    case INCREMENT_BY_NUMBER: {
      const { id, number } = action.payload;
      const targetIndex = state.cartItems.findIndex((item) => item.id === id);
      const newItems = [...state.cartItems];
      newItems[targetIndex].amount += number;

      return { ...state, cartItems: newItems };
    }
    default:
      return state;
  }
};

export { addItem, deleteItem, increment, decrement, incrementByNumber };

export default cartReducer;
