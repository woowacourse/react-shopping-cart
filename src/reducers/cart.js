import { 장바구니_액션 } from 'actions/types';

const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 장바구니_액션.ADD_NEW_PRODUCT:
      return { items: [...state.items, payload] };

    case 장바구니_액션.ADD_EXIST_PRODUCT:
      return {
        items: [...state.items].map((item) => {
          if (item.id === payload.id) {
            return payload;
          }

          return item;
        }),
      };

    case 장바구니_액션.DELETE_PRODUCT:
      return {
        items: [...state.items].filter((item) =>
          payload.every((willDeleteItem) => item.id !== willDeleteItem),
        ),
      };

    case 장바구니_액션.MODIFY_PRODUCT_COUNT:
      return {
        items: [...state.items].map((item) => {
          if (item.id === payload.productId) {
            const modifiedItem = item;
            modifiedItem.count = payload.count;
            return modifiedItem;
          }

          return item;
        }),
      };

    default:
      return state;
  }
};
