import { buildThunkActionGroup } from 'redux/utils';
import { Item } from 'types/domain';
import { Valueof } from 'types/utilities';

export const ItemListActionType = {
  GET_ITEM_LIST: 'items/GET_ITEM_LIST',
  GET_ITEM_LIST_START: 'items/GET_ITEM_LIST_START',
  GET_ITEM_LIST_SUCCESS: 'items/GET_ITEM_LIST_SUCCESS',
  GET_ITEM_LIST_FAILURE: 'items/GET_ITEM_LIST_FAILURE',
} as const;

const getItemListActionGroup = buildThunkActionGroup<
  Item[],
  typeof ItemListActionType.GET_ITEM_LIST
>(ItemListActionType.GET_ITEM_LIST);

export const itemListActions = {
  getItemListActionGroup,
};

type StatusType = 'success' | 'failure' | 'request';
type ActionGroupType = Valueof<typeof itemListActions>;
type AllActionType = ReturnType<ActionGroupType[StatusType]>['type'];

type ActionType = (arg?: any) => { type: AllActionType; payload?: any };
type UnionAction<T extends Record<StatusType, ActionType>> = ReturnType<T[StatusType]>;

export type ItemListAction = UnionAction<typeof getItemListActionGroup>;
