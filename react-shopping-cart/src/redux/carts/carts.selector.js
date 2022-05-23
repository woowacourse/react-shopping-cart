import { createSelector } from 'reselect';

const selectCarts = (state) => state.carts;

export const selectIsCartsLoading = createSelector(
  [selectCarts],
  (carts) => carts.isLoading
);

export const selectCurrentCarts = createSelector(
  [selectCarts],
  (carts) => carts.carts
);

export const selectCartsError = createSelector(
  [selectCarts],
  (carts) => carts.error
);

export const selectCartsIsAllChecked = createSelector(
  [selectCarts],
  (carts) => carts.allChecked
);
