import { createSelector } from 'reselect';

const selectCarts = (state) => state.carts;

export const selectCartsLoading = createSelector(
  [selectCarts],
  (carts) => carts.loading
);

export const selectCurrentCarts = createSelector(
  [selectCarts],
  (carts) => carts.carts
);

export const selectCartsError = createSelector(
  [selectCarts],
  (carts) => carts.error
);
