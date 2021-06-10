import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store";

import { ORDER_COUNT } from "../constants/standard";

interface CheckedList {
  [key: string]: boolean;
}

interface OrderCountList {
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

  const [checkedList, setCheckedList] = useState<CheckedList>({});
  const [orderCountList, setOrderCountList] = useState<OrderCountList>({});

  const totalPrice = cart.reduce((acc, { cartId, price }) => {
    return checkedList[cartId] ? acc + price * orderCountList[cartId] : acc;
  }, 0);

  const setCheckedListAll = (checked: boolean) => {
    setCheckedList(
      cart.reduce((acc: CheckedList, { cartId }) => {
        acc[cartId] = checked;

        return acc;
      }, {})
    );
  };

  const resetOrderCountList = () => {
    setOrderCountList(
      cart.reduce((acc: OrderCountList, { cartId }) => {
        acc[cartId] = 1;

        return acc;
      }, {})
    );
  };

  const getCheckedCount = () => {
    return Object.values(checkedList).filter(Boolean).length;
  };

  const getTotalCheckedIndicator = () => {
    const checkedCount = getCheckedCount();

    if (checkedCount === cart.length) return "선택 해제";
    if (checkedCount === 0) return "전체 선택";
    return `${checkedCount}개 선택`;
  };

  const onChangeTotalChecked = () => {
    const checkedCount = getCheckedCount();

    setCheckedListAll(checkedCount !== cart.length);
  };

  const onChangeChecked = (cartId: string) => {
    setCheckedList((prev) => ({ ...prev, [cartId]: !prev[cartId] }));
  };

  const onIncrementOrderCount = (cartId: string) => {
    setOrderCountList((prev) => {
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
    setOrderCountList((prev) => {
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
    setCheckedListAll(true);
    resetOrderCountList();
  }, [cart]);

  return {
    cart,
    loading,
    requestErrorMessage,
    getCheckedCount,
    onChangeTotalChecked,
    getTotalCheckedIndicator,
    checkedList,
    orderCountList,
    onIncrementOrderCount,
    onDecrementOrderCount,
    onChangeChecked,
    totalPrice,
  };
};

export default useCart;
