export const ADD_ALL_ITEM = 'ADD_ALL_ITEM';
export const DELETE_ALL_ITEM = 'DELETE_ALL_ITEM';
export const ADD_SPECIFIC_ITEM = 'ADD_SPECIFIC_ITEM';
export const DELETE_SPECIFIC_ITEM = 'DELETE_SPECIFIC_ITEM';

export const addAllItem = itemList => ({ type: ADD_ALL_ITEM, payload: { itemList } });
export const deleteAllItem = () => ({ type: DELETE_ALL_ITEM, payload: {} });
export const addSpecificItem = id => ({
  type: ADD_SPECIFIC_ITEM,
  payload: { id },
});
export const deleteSpecificItem = id => ({ type: DELETE_SPECIFIC_ITEM, payload: { id } });
