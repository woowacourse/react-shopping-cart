import type { CartProductWithChecked, CheckedState } from './type';

export const getIsAllChecked = (checked: CheckedState[]) =>
  checked.length > 0 && checked.every((item) => item.isChecked);

export const getIsAllUnchecked = (checked: CheckedState[]) =>
  checked.every((item) => !item.isChecked);

export const findTargetChecked = (checked: CheckedState[], id: number) =>
  checked.find((item) => item.id === id);

export const filterCartProductChecked = <T extends { isChecked: boolean }>(
  cartProducts: T[],
  isChecked: boolean
) => cartProducts.filter((cartProduct) => cartProduct.isChecked === isChecked);

export const getCheckedPrice = (cartProducts: CartProductWithChecked[]) =>
  cartProducts.reduce(
    (acc, cur) =>
      cur.isChecked ? acc + cur.quantity * cur.product.price : acc,
    0
  );

export const updateCartProductChecked = <T>(item: T, isChecked: boolean) => ({
  ...item,
  isChecked,
});
