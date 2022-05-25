import { RootState } from "redux/store";
import { createSelector } from "reselect";

const selectOrders = (state: RootState) => state.orders;

export const selectOrdersLoading = createSelector(
  [selectOrders],
  (orders) => orders.loading
);

export const selectCurrentOrders = createSelector(
  [selectOrders],
  (orders) => orders.orders
);

export const selectOrdersError = createSelector(
  [selectOrders],
  (orders) => orders.error
);
