import { deleteItemFromCart } from './modules/cartSlice';

export const printCommasToPrice = (price) => {
  return Number(price).toLocaleString('en-US');
};

export const getTotalPrice = (items) =>
  items.reduce((totalPrice, item) => (totalPrice += item.checked ? item.price * item.quantity : 0), 0);

export const deleteCheckedItems = (callback, itemIds) => {
  itemIds.forEach((id) => {
    callback(deleteItemFromCart(id));
  });
};
