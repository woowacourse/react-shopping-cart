import { Item } from 'types/domain';

import { PageItemListAction } from './action';

export interface PageItemListState {
  readonly loading: boolean;
  readonly error: string | null;
  readonly data: Item[];
}

const initialState: PageItemListState = {
  loading: true,
  error: null,
  data: [],
};

export const pageItemListReducer = (state = initialState, action: PageItemListAction) => {
  switch (action.type) {
    case 'items/GET_PAGE_ITEM_LIST_REQUEST':
      return { loading: true, error: null, data: [] };
    case 'items/GET_PAGE_ITEM_LIST_SUCCESS':
      return { loading: false, error: null, data: action.payload };
    case 'items/GET_PAGE_ITEM_LIST_FAILURE':
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};
