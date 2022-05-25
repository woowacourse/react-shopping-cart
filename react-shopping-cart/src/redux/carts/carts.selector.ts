import { RootState } from "redux/store";
import { createSelector } from "reselect";

const selectCarts = (state: RootState) => state.carts;

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
