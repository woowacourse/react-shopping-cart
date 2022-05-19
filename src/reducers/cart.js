import { 장바구니_액션 } from 'actions/types';

const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  const modifiedItems = [];

  switch (type) {
    case 장바구니_액션.ADD_NEW_PRODUCT:
      return { items: [...state.items, payload] };

    case 장바구니_액션.ADD_EXIST_PRODUCT:
      [...state.items].forEach((item) => {
        if (item.id === payload.id) {
          modifiedItems.push(payload);
          return;
        }
        modifiedItems.push(item);
      });

      return { items: modifiedItems };

    default:
      return state;
  }
};
