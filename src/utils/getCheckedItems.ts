import { CartItem } from '../types';

const getCheckedItems = (cartItems: CartItem[], checkedCartIds: number[]) => {
  const checkedSet = new Set(checkedCartIds);
  return cartItems.filter(({ id }) => checkedSet.has(id));
};

export default getCheckedItems;
