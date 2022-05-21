import { Item } from 'types/domain';

export const ItemListActionType = {
  GET_ITEM_LIST_START: 'items/GET_ITEM_LIST_START',
  GET_ITEM_LIST_SUCCESS: 'items/GET_ITEM_LIST_SUCCESS',
  GET_ITEM_LIST_FAILURE: 'items/GET_ITEM_LIST_FAILURE',
} as const;

const getItemListStart = () => ({ type: ItemListActionType.GET_ITEM_LIST_START });
const getItemListSuccess = (itemList: Item[]) => ({
  type: ItemListActionType.GET_ITEM_LIST_SUCCESS,
  payload: itemList,
});
const getItemListFailure = (message: string) => ({
  type: ItemListActionType.GET_ITEM_LIST_FAILURE,
  payload: message,
});

export const itemListAction = {
  getItemListStart,
  getItemListSuccess,
  getItemListFailure,
};

type ItemListActionCreators = typeof itemListAction[keyof typeof itemListAction];
export type ItemListAction = ReturnType<ItemListActionCreators>;
