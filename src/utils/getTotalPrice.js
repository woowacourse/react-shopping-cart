export const getTotalPrice = (list) => {
  if (!Array.isArray(list)) {
    throw new Error(`리스트의 타입이 적절하지 않습니다. - 입력 타입(${typeof list})`);
  }

  if (!list.every((item) => item.price && item.quantity)) {
    throw new Error('price 또는 quantity가 존재하지 않습니다');
  }

  return list.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
};
