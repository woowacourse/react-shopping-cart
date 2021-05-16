import { ACTION_TYPE } from '../constants';

const initialState = {
  itemList: [],
};

export const setItemList = data => {
  return {
    type: ACTION_TYPE.SET_ITEM_LIST,
    payload: data,
  };
};

export const itemListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_ITEM_LIST:
      return {
        ...state,
        itemList: action.payload,
      };

    default:
      return state;
  }
};