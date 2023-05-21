import { DefaultValue, atom, selector } from 'recoil';
import { client } from '../../api';
import type { CartItemEntity } from '../../api/rest/ShoppingCartRestAPI';
import type { CartItem } from '../../type';
import localStorageEffect from '../effects/localStorageEffect';

const cartItemEntitiesState = atom<CartItemEntity[]>({
  key: 'cartItemEntitiesState',
  default: client
    .get('/cart-items')
    .acceptOrThrow(200)
    .then((response) => response.data),
});

const unselectedForOrdersState = atom<Array<CartItem['id']>>({
  key: 'unselectedForOrdersState',
  default: [],
  effects: [localStorageEffect('unselectedForOrders')],
});

const cartItemsState = selector<CartItem[]>({
  key: 'cartItemsState',
  get: ({ get }) => {
    const cartItemEntities = get(cartItemEntitiesState);
    const unselectedForOrders = get(unselectedForOrdersState);

    return cartItemEntities.map((cartItemEntity) => ({
      ...cartItemEntity,
      unselectedForOrder: unselectedForOrders.includes(cartItemEntity.id),
    }));
  },
  set: ({ set, reset }, newCartItems) => {
    if (newCartItems instanceof DefaultValue) {
      reset(cartItemEntitiesState);
      reset(unselectedForOrdersState);
      return;
    }
    set(cartItemEntitiesState, newCartItems);
    set(
      unselectedForOrdersState,
      newCartItems.filter((cartItem) => cartItem.unselectedForOrder).map((cartItem) => cartItem.id),
    );
  },
});

export default cartItemsState;
