import type { CartProduct } from '../../types/product';

export const findTargetChecked = (checked: number[], targetId: number) =>
  checked.find((id) => id === targetId);

export const addCartProductChecked = (
  checkedIds: number[],
  newCheckedId: number
) => [...checkedIds, newCheckedId];

export const deleteCartProductChecked = (
  checkedIds: number[],
  targetId: number
) => checkedIds.filter((id) => id !== targetId);

export const getCheckedPrice = (cartProducts: CartProduct[]) =>
  cartProducts.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0);
