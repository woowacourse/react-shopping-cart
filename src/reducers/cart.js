import { 장바구니_액션 } from 'actions/types';

const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 장바구니_액션.ADD_CART:
      return { ...state, items: [...state.items, payload] };

    default:
      return state;
  }
};
