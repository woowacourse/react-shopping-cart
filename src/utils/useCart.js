// eslint-disable-next-line import/prefer-default-export
export const useCart = (cart) => {
  const checkedItems = Object.values(cart).filter((item) => item.checked);
  const hasCheckedItems = checkedItems.length > 0;
  const totalPrice = checkedItems.reduce(
    (acc, { amount, price }) => acc + amount * price,
    0
  );

  const checkedSet = new Set(Object.values(cart).map(({ checked }) => checked));
  let isCheckAll = null;
  switch (checkedSet.size) {
    case 0:
      isCheckAll = false;
      break;
    case 1:
      isCheckAll = [...checkedSet].pop();
      break;
    default:
  }

  return { checkedItems, hasCheckedItems, isCheckAll, totalPrice };
};
