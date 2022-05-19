export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

export const addItem = id => ({ type: ADD_ITEM, payload: { id } });
export const deleteItem = id => ({ type: DELETE_ITEM, payload: { id } });
export const increaseQuantity = id => ({ type: INCREASE_QUANTITY, payload: { id } });
export const decreaseQuantity = id => ({ type: DECREASE_QUANTITY, payload: { id } });
