import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store";

import { ORDER_COUNT } from "../constants/standard";

interface CheckedItems {
  [key: string]: boolean;
}

interface OrderCountItems {
  [key: string]: number;
}

const useCart = () => {
  const { cart, loading, requestErrorMessage } = useSelector(
    ({ cart: { cart, loading, requestErrorMessage } }: RootState) => ({
      cart,
      loading,
      requestErrorMessage,
    })
  );

  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [orderCountItems, setOrderCountItems] = useState<OrderCountItems>({});

  const totalPrice = cart.reduce((acc, { cartId, price }) => {
    return checkedItems[cartId] ? acc + price * orderCountItems[cartId] : acc;
  }, 0);

  const setCheckedItemsAll = (checked: boolean) => {
    setCheckedItems(
      cart.reduce((acc: CheckedItems, { cartId }) => {
        acc[cartId] = checked;

        return acc;
      }, {})
    );
  };

  const resetOrderCountItems = () => {
    setOrderCountItems(
      cart.reduce((acc: OrderCountItems, { cartId }) => {
        acc[cartId] = 1;

        return acc;
      }, {})
    );
  };

  const getCheckedCount = () => {
    return Object.values(checkedItems).filter(Boolean).length;
  };

  const getTotalCheckedIndicator = () => {
    const checkedCount = getCheckedCount();

    if (checkedCount === cart.length) return "선택 해제";
    if (checkedCount === 0) return "전체 선택";
    return `${checkedCount}개 선택`;
  };

  const onChangeTotalChecked = () => {
    const checkedCount = getCheckedCount();

    setCheckedItemsAll(checkedCount !== cart.length);
  };

  const onChangeChecked = (cartId: string) => {
    setCheckedItems((prev) => ({ ...prev, [cartId]: !prev[cartId] }));
  };

  const onIncrementOrderCount = (cartId: string) => {
    setOrderCountItems((prev) => {
      const prevCount = prev[cartId];

      if (prevCount >= ORDER_COUNT.MAX) {
        return prev;
      }

      return {
        ...prev,
        [cartId]: prev[cartId] + 1,
      };
    });
  };

  const onDecrementOrderCount = (cartId: string) => {
    setOrderCountItems((prev) => {
      const prevCount = prev[cartId];

      if (prevCount <= ORDER_COUNT.MIN) {
        return prev;
      }

      return {
        ...prev,
        [cartId]: prev[cartId] - 1,
      };
    });
  };

  useEffect(() => {
    setCheckedItemsAll(true);
    resetOrderCountItems();
  }, [cart]);

  return {
    cart,
    loading,
    requestErrorMessage,
    getCheckedCount,
    onChangeTotalChecked,
    getTotalCheckedIndicator,
    checkedItems,
    orderCountItems,
    onIncrementOrderCount,
    onDecrementOrderCount,
    onChangeChecked,
    totalPrice,
  };
};

export default useCart;
