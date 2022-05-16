import { Item } from 'types/domain';

export const enum ItemListActionType {
  GET_ITEM_LIST_START = 'items/GET_ITEM_LIST_START',
  GET_ITEM_LIST_SUCCESS = 'items/GET_ITEM_LIST_SUCCESS',
  GET_ITEM_LIST_FAILURE = 'items/GET_ITEM_LIST_FAILURE',
}

interface GetItemListActionStart {
  type: ItemListActionType.GET_ITEM_LIST_START;
}

interface GetItemListActionSuccess {
  type: ItemListActionType.GET_ITEM_LIST_SUCCESS;
  payload: Item[];
}

interface GetItemListActionFailure {
  type: ItemListActionType.GET_ITEM_LIST_FAILURE;
  payload: string;
}

export type ItemListAction =
  | GetItemListActionStart
  | GetItemListActionSuccess
  | GetItemListActionFailure;
