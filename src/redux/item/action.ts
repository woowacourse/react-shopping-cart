import { buildThunkActionGroup } from 'redux/utils';
import { Item } from 'types/domain';
import { Valueof } from 'types/utilities';

export const ItemActionType = {
  GET_ITEM: 'item/GET_ITEM',
} as const;

const getItemActionGroup = buildThunkActionGroup<Item, typeof ItemActionType.GET_ITEM>(
  ItemActionType.GET_ITEM
);

export const itemActions = {
  getItemActionGroup,
};

type StatusType = 'success' | 'failure' | 'request';
type ActionGroupType = Valueof<typeof itemActions>;
type AllActionType = ReturnType<ActionGroupType[StatusType]>['type'];

type ActionType = (arg?: any) => { type: AllActionType; payload?: any };
type UnionAction<T extends Record<StatusType, ActionType>> = ReturnType<T[StatusType]>;

export type ItemAction = UnionAction<typeof getItemActionGroup>;
