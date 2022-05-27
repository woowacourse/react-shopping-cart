import { buildThunkActionGroup } from 'redux/utils';
import { Item } from 'types/domain';
import { Valueof } from 'types/utilities';

export const PageItemListActionType = {
  GET_PAGE_ITEM_LIST: 'items/GET_PAGE_ITEM_LIST',
} as const;

const getPageItemListActionGroup = buildThunkActionGroup<
  Item[],
  typeof PageItemListActionType.GET_PAGE_ITEM_LIST
>(PageItemListActionType.GET_PAGE_ITEM_LIST);

export const pageItemListActions = {
  getPageItemListActionGroup,
};

type StatusType = 'success' | 'failure' | 'request';
type ActionGroupType = Valueof<typeof pageItemListActions>;
type AllActionType = ReturnType<ActionGroupType[StatusType]>['type'];

type ActionType = (arg?: any) => { type: AllActionType; payload?: any };
type UnionAction<T extends Record<StatusType, ActionType>> = ReturnType<T[StatusType]>;

export type PageItemListAction = UnionAction<typeof getPageItemListActionGroup>;
