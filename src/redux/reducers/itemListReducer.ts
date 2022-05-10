import { Item, Action, ActionType } from '../actions/itemList';

interface ItemListState {
  loading: boolean;
  error: string | null;
  data: Item[];
}

const initialState: ItemListState = {
  loading: false,
  error: null,
  data: [],
};

export const itemListReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.GET_ITEMLIST_START:
      return { loading: true, error: null, data: [] };
    case ActionType.GET_ITEMLIST_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionType.GET_ITEMLIST_FAILURE:
      return { loading: false, error: action.payload, data: [] };
    default:
      return initialState;
  }
};
