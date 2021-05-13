import { deleteItem } from './modules/cart';

export const printCommasToPrice = (price) => {
  price = price.toString();
  const pattern = /(-?\d+)(\d{3})/;

  while (pattern.test(price)) {
    price = price.replace(pattern, '$1,$2');
  }

  return price;
};

export const getTotalPrice = (items) =>
  items.reduce((totalPrice, item) => (totalPrice += item.checked ? item.price * item.quantity : 0), 0);

// TODO : 여기에 있어야 하나요??? 서비스로직으로 빼는 거 질문하거나 아니면 알아보거나
// dispatch 대신에 callback이름으로 넘겨보았다. 이거 아무튼 질문 필요
export const deleteCheckedItems = (callback, itemIds) => {
  itemIds.forEach((id) => {
    callback(deleteItem(id));
  });
};
