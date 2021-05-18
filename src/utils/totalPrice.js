export const getTotalPrice = (list) => {
  if (!Array.isArray(list)) throw new Error(`${typeof list} is invalid type`);
  if (!list.every((item) => item.price && item.quantity)) throw new Error('price, quantity가 존재하지 않습니다.');

  return list.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
};
