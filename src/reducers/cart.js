/* eslint-disable no-param-reassign */
import { CARTS_ACTIONS } from 'actions/types';
import { createAsyncState } from 'lib/requestUtils';

const initialState = {
  items: createAsyncState.initial([]),
};

export default (state = initialState, action) => {
  const { type, payload = {}, async = {} } = action;

  switch (type) {
    case CARTS_ACTIONS.UPDATE_CART_LIST_SUCCESS: {
      const updateCartList = payload.map((item) => ({ ...item, isChecked: true }));
      return { ...state, items: { ...state.items, ...async, content: updateCartList } };
    }

    case CARTS_ACTIONS.UPDATE_CART_LIST_PENDING:
    case CARTS_ACTIONS.UPDATE_CART_LIST_ERROR:
      return { ...state, items: { ...state.items, ...async } };

    case CARTS_ACTIONS.ADD_CART_LIST_SUCCESS: {
      const updateCartList = [...state.items.content];
      updateCartList.push({ ...payload, isChecked: true });

      return { ...state, items: { ...state.items, ...async, content: updateCartList } };
    }

    case CARTS_ACTIONS.UPDATE_CART_ITEM_SUCCESS: {
      const { id: updatedId } = payload;
      const targetIndex = state.items.content.findIndex(({ id }) => id === updatedId);

      const updateCartList = [...state.items.content];
      updateCartList[targetIndex] = { ...updateCartList[targetIndex], ...payload };

      return { ...state, items: { ...state.items, content: updateCartList } };
    }

    case CARTS_ACTIONS.UPDATE_CART_ITEM_CHECKED: {
      const { id: updatedId, isChecked } = payload;
      const targetIndex = state.items.content.findIndex(({ id }) => id === updatedId);

      const updateCartList = [...state.items.content];
      updateCartList[targetIndex].isChecked = isChecked;

      return { ...state, items: { ...state.items, content: updateCartList } };
    }

    case CARTS_ACTIONS.UPDATE_CART_ITEM_ALL_CHECKED: {
      const { isChecked } = payload;
      const updateCartList = [...state.items.content].map((item) => ({ ...item, isChecked }));

      return { ...state, items: { ...state.items, content: updateCartList } };
    }

    case CARTS_ACTIONS.REMOVE_CART_ITEM_SUCCESS: {
      const { id: updatedId } = payload;
      const updateCartList = [...state.items.content].filter(({ id }) => id !== updatedId);

      return { ...state, items: { ...state.items, content: updateCartList } };
    }

    case CARTS_ACTIONS.REMOVE_CART_ITEM_LIST_SUCCESS: {
      const { idList } = payload;
      const updateCartList = [...state.items.content].filter(({ id }) => !idList.includes(id));

      return { ...state, items: { ...state.items, content: updateCartList } };
    }

    default:
      return state;
  }
};
