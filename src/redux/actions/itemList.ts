export enum ActionType {
  GET_ITEMLIST_START = 'items/GET_ITEMLIST_START',
  GET_ITEMLIST_SUCCESS = 'items/GET_ITEMLIST_SUCCESS',
  GET_ITEMLIST_FAILURE = 'items/GET_ITEMLIST_FAILURE',
}

export interface Item {
  id: number;
  thumbnailUrl: string;
  title: string;
  price: number;
}

interface GetItemListActionStart {
  type: ActionType.GET_ITEMLIST_START;
}

interface GetItemListActionSuccess {
  type: ActionType.GET_ITEMLIST_SUCCESS;
  payload: Item[];
}

interface GetItemListActionFailure {
  type: ActionType.GET_ITEMLIST_FAILURE;
  payload: string;
}

export type Action = GetItemListActionStart | GetItemListActionSuccess | GetItemListActionFailure;
