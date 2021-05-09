import { Product } from '../../types';

export const ADD_ITEM = 'cart/ADD_ITEM';

export const addItem = (item: Product) => ({
  type: ADD_ITEM,
  payload: item,
});

export type CartAction = ReturnType<typeof addItem>;
