export enum ItemListActionType {
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
  type: ItemListActionType.GET_ITEMLIST_START;
}

interface GetItemListActionSuccess {
  type: ItemListActionType.GET_ITEMLIST_SUCCESS;
  payload: Item[];
}

interface GetItemListActionFailure {
  type: ItemListActionType.GET_ITEMLIST_FAILURE;
  payload: string;
}

export type ItemListAction =
  | GetItemListActionStart
  | GetItemListActionSuccess
  | GetItemListActionFailure;
