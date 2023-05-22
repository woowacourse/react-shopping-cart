/* eslint-disable no-nested-ternary */
import { DefaultValue, atom, atomFamily, selector, selectorFamily } from 'recoil';
import { client, path } from '../../api';
import type { CartItemEntity, ProductEntity } from '../../api/rest/ShoppingCartRestAPI';
import type { CartItem } from '../../type';
import localStorageEffect from '../effects/localStorageEffect';

const cartItemEntitiesQuery = selector<CartItemEntity[]>({
  key: 'cartItemEntitiesQuery',
  get: () =>
    client
      .get('/cart-items')
      .acceptOrThrow(200)
      .then((response) => response.data),
});

type SyncCartItem = {
  id: CartItemEntity['id'];
  productId: ProductEntity['id'];
  quantity: CartItem['quantity'];
};

type SyncCartItemState = {
  semaphore: Promise<unknown> | null;
  state: Pick<SyncCartItem, 'productId'> | SyncCartItem;
  enqueuedUpdates: Array<Partial<SyncCartItem> | null>;
};

const syncCartItemState = atomFamily<SyncCartItemState, ProductEntity['id']>({
  key: 'syncCartItemState',
  default: selectorFamily({
    key: 'syncCartItemState/default',
    get:
      (productId) =>
      ({ get }) => {
        const cartItemEntities = get(cartItemEntitiesQuery);
        return {
          semaphore: null,
          state: {
            productId,
            ...cartItemEntities.find((cartItemEntity) => cartItemEntity.product.id === productId),
          },
          enqueuedUpdates: [],
        };
      },
  }),
  effects: [
    ({ setSelf, onSet }) => {
      const reducer = (syncCartItem: SyncCartItemState): SyncCartItemState => {
        const deleteCartItem = (id: CartItemEntity['id']) => {
          const semaphore = client.delete(path('/cart-items/:cartItemId', id)).acceptOrThrow(204);

          semaphore.finally(() =>
            setSelf((syncCartItem) => {
              if (syncCartItem instanceof DefaultValue) return syncCartItem;

              return reducer({ ...syncCartItem, semaphore: null });
            }),
          );
          return {
            ...syncCartItem,
            state: { productId: syncCartItem.state.productId },
            semaphore,
            enqueuedUpdates: [],
          };
        };

        const createCartItem = () => {
          const semaphore = client
            .post('/cart-items', { productId: syncCartItem.state.productId })
            .acceptOrThrow(201);

          semaphore.then((response) =>
            setSelf((syncCartItem) => {
              if (syncCartItem instanceof DefaultValue) return syncCartItem;

              return reducer({
                ...syncCartItem,
                state: {
                  ...syncCartItem.state,
                  id: Number(
                    String(response.headers.location)
                      .match(/(\d+)$/)
                      ?.at(0),
                  ),
                },
                semaphore: null,
              });
            }),
          );

          return { ...syncCartItem, semaphore };
        };

        const updateCartItemQuantity = (id: CartItemEntity['id'], quantity: number) => {
          const semaphore = client
            .patch(path('/cart-items/:cartItemId', id), { quantity })
            .acceptOrThrow(200);

          semaphore.finally(() =>
            setSelf((syncCartItem) => {
              if (syncCartItem instanceof DefaultValue) return syncCartItem;

              return reducer({ ...syncCartItem, semaphore: null });
            }),
          );

          return {
            ...syncCartItem,
            semaphore,
            state: { ...syncCartItem.state, quantity },
            enqueuedUpdates: [],
          };
        };

        // is update progressing now?
        if (syncCartItem.semaphore !== null) return syncCartItem;

        // consume actions (merge into final value)
        const finalState = syncCartItem.enqueuedUpdates.reduce(
          (currentState, enqueuedUpdate) => ({ ...currentState, ...enqueuedUpdate }),
          syncCartItem.state,
        );

        // Deletion
        const shouldDelete = 'quantity' in finalState && finalState.quantity <= 0;
        if (shouldDelete) {
          if ('id' in finalState) return deleteCartItem(finalState.id);
          return syncCartItem;
        }

        // Creation: if CartItem.id not exists, create one
        if (!('quantity' in finalState)) return syncCartItem;
        const shouldCreate = !('id' in finalState);
        if (shouldCreate) {
          return createCartItem();
        }

        // Update: update quantity
        if (
          'quantity' in syncCartItem.state &&
          syncCartItem.state.quantity === finalState.quantity
        ) {
          return syncCartItem;
        }
        return updateCartItemQuantity(finalState.id, finalState.quantity);
      };

      onSet((value) => {
        const newValue = reducer(value);
        if (newValue) setSelf(newValue);
      });
    },
  ],
});

const localCartItemsState = atom<Omit<CartItem, 'unselectedForOrder'>[]>({
  key: 'localCartItemsState',
  default: selector({
    key: 'localCartItemsState/default',
    get: ({ get }) => get(cartItemEntitiesQuery),
  }),
});

const unselectedForOrdersState = atom<Array<CartItem['product']['id']>>({
  key: 'unselectedForOrdersState',
  default: [],
  effects: [localStorageEffect('unselectedForOrders')],
});

const cartItemsState = selector<CartItem[]>({
  key: 'cartItemsState',
  get: ({ get }) => {
    const cartItems = get(localCartItemsState);
    const unselectedForOrders = get(unselectedForOrdersState);

    return cartItems.map((cartItem) => ({
      ...cartItem,
      unselectedForOrder: unselectedForOrders.includes(cartItem.product.id),
    }));
  },
  set: ({ get, set }, rawNewCartItems) => {
    const oldCartItems = get(localCartItemsState);
    if (rawNewCartItems instanceof DefaultValue) {
      throw new Error('reset of cartItemsState is not implemented!');
    }

    const newCartItems = rawNewCartItems.filter((newCartItem) => newCartItem.quantity > 0);

    // update origin atoms
    set(localCartItemsState, newCartItems);
    set(
      unselectedForOrdersState,
      newCartItems
        .filter((cartItem) => cartItem.unselectedForOrder)
        .map((cartItem) => cartItem.product.id),
    );

    // enqueue update to syncCartItemState
    const deletedCartItems = oldCartItems.filter(
      (cartItemEntity) =>
        newCartItems.find((newCartItem) => newCartItem.product.id === cartItemEntity.product.id) ===
        undefined,
    );

    deletedCartItems.forEach((cartItem) => {
      set(syncCartItemState(cartItem.product.id), (syncCartItem) => ({
        ...syncCartItem,
        enqueuedUpdates: [...syncCartItem.enqueuedUpdates, { quantity: 0 }],
      }));
    });

    newCartItems.forEach((cartItem) => {
      set(syncCartItemState(cartItem.product.id), (syncCartItem) => ({
        ...syncCartItem,
        enqueuedUpdates: [...syncCartItem.enqueuedUpdates, { quantity: cartItem.quantity }],
      }));
    });
  },
});

export default cartItemsState;
