import { Item } from 'types/domain';

import { ItemListAction } from './action';

export interface ItemListState {
  readonly loading: boolean;
  readonly error: string | null;
  readonly data: Item[];
}

const initialState: ItemListState = {
  loading: true,
  error: null,
  data: [],
};

export const itemListReducer = (state = initialState, action: ItemListAction) => {
  switch (action.type) {
    case 'items/GET_ITEM_LIST_REQUEST':
      return { loading: true, error: null, data: [] };
    case 'items/GET_ITEM_LIST_SUCCESS':
      return { loading: false, error: null, data: action.payload };
    case 'items/GET_ITEM_LIST_FAILURE':
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};
