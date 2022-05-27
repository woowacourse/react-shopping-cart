export type CartItem = {
  name: string;
  price: number;
  img: string;
  id: number;
  amount: number;
  isSelected: boolean;
};
export type CartState = { items: CartItem[] };

type Action =
  | ReturnType<typeof addItem>
  | ReturnType<typeof deleteItem>
  | ReturnType<typeof deleteBySelectedItems>
  | ReturnType<typeof selectItem>
  | ReturnType<typeof selectAllItems>
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
  | ReturnType<typeof incrementByNumber>;

// initialState
const initialState: CartState = {
  items: [],
};

// 액션
const ADD = "cart/ADD" as const;
const DELETE = "cart/DELETE" as const;
const DELETE_BY_SELECTED = "cart/DELETE_BY_SELECTED" as const;
const SELECT = "cart/SELECT" as const;
const SELECT_ALL = "cart/SELECT_ALL" as const;
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
const deleteBySelectedItems = () => ({
  type: DELETE_BY_SELECTED,
});
const selectItem = (id: number) => ({
  type: SELECT,
  payload: { id },
});
const selectAllItems = (isAllSelected: boolean) => ({
  type: SELECT_ALL,
  payload: { isAllSelected },
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
      const newItems = [...state.items, item];

      return { ...state, items: newItems };
    }
    case DELETE: {
      const { id } = action.payload;
      const newItems = state.items.filter((item) => item.id !== id);

      return { ...state, items: newItems };
    }
    case DELETE_BY_SELECTED: {
      const newItems = state.items.filter((item) => !item.isSelected);

      return { ...state, items: newItems };
    }
    case SELECT: {
      const { id } = action.payload;
      const targetIndex = state.items.findIndex((item) => item.id === id);
      const newItems = [...state.items];
      newItems[targetIndex].isSelected = !newItems[targetIndex].isSelected;

      return { ...state, items: newItems };
    }
    case SELECT_ALL: {
      const { isAllSelected } = action.payload;
      const newItems = [...state.items].map((item) => {
        item.isSelected = isAllSelected ? false : true;
        return item;
      });

      return { ...state, items: newItems };
    }
    case INCREMENT: {
      const { id } = action.payload;
      const targetIndex = state.items.findIndex((item) => item.id === id);
      const newItems = [...state.items];
      newItems[targetIndex].amount++;

      return { ...state, items: newItems };
    }
    case DECREMENT: {
      const { id } = action.payload;
      const targetIndex = state.items.findIndex((item) => item.id === id);
      const newItems = [...state.items];
      newItems[targetIndex].amount--;

      return { ...state, items: newItems };
    }
    case INCREMENT_BY_NUMBER: {
      const { id, number } = action.payload;
      const targetIndex = state.items.findIndex((item) => item.id === id);
      const newItems = [...state.items];
      newItems[targetIndex].amount += number;

      return { ...state, items: newItems };
    }
    default:
      return state;
  }
};

export {
  addItem,
  deleteItem,
  deleteBySelectedItems,
  selectItem,
  selectAllItems,
  increment,
  decrement,
  incrementByNumber,
};

export default cartReducer;
