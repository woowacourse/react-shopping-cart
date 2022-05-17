import { Item } from 'types/domain';

import { ItemListAction, ItemListActionType } from '../actions/itemList';

interface ItemListState {
  readonly loading: boolean;
  readonly error: string | null;
  readonly data: Item[];
}

const initialState: ItemListState = {
  loading: false,
  error: null,
  data: [],
};

export const itemListReducer = (state = initialState, action: ItemListAction) => {
  switch (action.type) {
    case ItemListActionType.GET_ITEM_LIST_START:
      return { loading: true, error: null, data: [] };
    case ItemListActionType.GET_ITEM_LIST_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ItemListActionType.GET_ITEM_LIST_FAILURE:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};
