export const ADD_ITEM = 'ADD_ITEM';

export const DELETE_ITEM = 'DELETE_ITEM';

export const addItem = id => ({ type: ADD_ITEM, payload: { id } });

export const deleteItem = id => ({ type: DELETE_ITEM, payload: { id } });
