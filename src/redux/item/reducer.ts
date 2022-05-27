import { Item } from 'types/domain';

import { ItemAction } from './action';

export interface ItemState {
  readonly loading: boolean;
  readonly error: string | null;
  readonly data: Item;
}

const initialState: ItemState = {
  loading: true,
  error: null,
  data: null,
};

export const itemReducer = (state = initialState, action: ItemAction) => {
  switch (action.type) {
    case 'item/GET_ITEM_REQUEST':
      return { ...state, loading: true };
    case 'item/GET_ITEM_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'item/GET_ITEM_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
