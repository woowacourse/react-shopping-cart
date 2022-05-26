import { buildThunkActionGroup } from 'redux/utils';
import { CartItem } from 'types/domain';
import { Valueof } from 'types/utilities';

export const CartListActionType = {
  GET_CART_LIST: 'cart/GET_CART_LIST',
  PUT_CART_ITEM: 'cart/PUT_CART_ITEM',
  POST_CART_ITEM: 'cart/POST_CART_ITEM',
  PATCH_CART_SELECTED: 'cart/PATCH_CART_SELECTED',
  PATCH_ALL_CART_SELECTED: 'cart/PATCH_ALL_CART_SELECTED',
  DELETE_CART_ITEM: 'cart/DELETE_CART_ITEM',
  DELETE_ALL_CART_ITEM: 'cart/DELETE_ALL_CART_ITEM',
} as const;

const getCartListActionGroup = buildThunkActionGroup<
  CartItem[],
  typeof CartListActionType.GET_CART_LIST
>(CartListActionType.GET_CART_LIST);

const putCartItemActionGroup = buildThunkActionGroup<
  CartItem,
  typeof CartListActionType.PUT_CART_ITEM
>(CartListActionType.PUT_CART_ITEM);

const postCartItemActionGroup = buildThunkActionGroup<
  CartItem,
  typeof CartListActionType.POST_CART_ITEM
>(CartListActionType.POST_CART_ITEM);

const patchCartSelectedActionGroup = buildThunkActionGroup<
  CartItem,
  typeof CartListActionType.PATCH_CART_SELECTED
>(CartListActionType.PATCH_CART_SELECTED);

const patchAllCartSelectedActionGroup = buildThunkActionGroup<
  boolean,
  typeof CartListActionType.PATCH_ALL_CART_SELECTED
>(CartListActionType.PATCH_ALL_CART_SELECTED);

const deleteCartItemActionGroup = buildThunkActionGroup<
  number,
  typeof CartListActionType.DELETE_CART_ITEM
>(CartListActionType.DELETE_CART_ITEM);

const deleteAllCartItemActionGroup = buildThunkActionGroup(CartListActionType.DELETE_ALL_CART_ITEM);

export const cartListActions = {
  getCartListActionGroup,
  putCartItemActionGroup,
  postCartItemActionGroup,
  patchCartSelectedActionGroup,
  patchAllCartSelectedActionGroup,
  deleteCartItemActionGroup,
  deleteAllCartItemActionGroup,
};

// @TODO: ReturnType에 Generic이 있으면, 타입이 정의되지 않는다. 해결법 찾기
// type StatusType = keyof ReturnType<typeof buildThunkActionGroup>;

type StatusType = 'success' | 'failure' | 'request';
type ActionGroupType = Valueof<typeof cartListActions>;
type AllActionType = ReturnType<ActionGroupType[StatusType]>['type'];

type ActionType = (arg?: any) => { type: AllActionType; payload?: any };
type UnionAction<T extends Record<StatusType, ActionType>> = ReturnType<T[StatusType]>;

export type CartListAction =
  | UnionAction<typeof getCartListActionGroup>
  | UnionAction<typeof putCartItemActionGroup>
  | UnionAction<typeof postCartItemActionGroup>
  | UnionAction<typeof patchCartSelectedActionGroup>
  | UnionAction<typeof patchAllCartSelectedActionGroup>
  | UnionAction<typeof deleteCartItemActionGroup>
  | UnionAction<typeof deleteAllCartItemActionGroup>;
