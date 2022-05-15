import { createSelector } from 'reselect';

const selectProducts = (state) => state.products;

export const selectProductsLoading = createSelector(
  [selectProducts],
  (products) => products.loading
);

export const selectCurrentProducts = createSelector(
  [selectProducts],
  (products) => products.products
);

export const selectProductsError = createSelector(
  [selectProducts],
  (products) => products.error
);

export const selectDetailProduct = createSelector(
  [selectProducts],
  (products) => products.detailProduct
);
