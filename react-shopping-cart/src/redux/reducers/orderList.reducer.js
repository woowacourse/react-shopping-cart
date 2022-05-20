import {
  ADD_ALL_ITEM,
  DELETE_ALL_ITEM,
  ADD_SPECIFIC_ITEM,
  DELETE_SPECIFIC_ITEM,
} from 'redux/actions/orderList.action';

const initialState = [];

function orderList(state = initialState, action) {
  switch (action.type) {
    case ADD_ALL_ITEM:
      return action.payload.itemList.map(item => item.id);

    case DELETE_ALL_ITEM:
      return [];

    case ADD_SPECIFIC_ITEM:
      return [...state, action.payload.id];

    case DELETE_SPECIFIC_ITEM:
      return state.filter(id => id !== action.payload.id);

    default:
      return state;
  }
}

export default orderList;
