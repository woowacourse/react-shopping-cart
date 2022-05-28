import React, { useMemo, useState } from 'react';
import useGlobalState from 'hooks/useGlobalState';
import { CartProductListState } from 'store/cartProductList/reducer';
import { isExistInList, sum } from 'utils';

const useCartList = () => {
  const state = useGlobalState('cart');
  const [checkedIdList, setCheckedIdList] = useState<number[]>([]);

  const { cartProductList } = state as CartProductListState;

  const getCheckedCartProductList = () => {
    return cartProductList.filter(({ id }) => isExistInList<number>(checkedIdList, id));
  };

  const [totalPrice, isAllChecked] = useMemo(() => {
    const checkedCartProductList = getCheckedCartProductList();
    const priceList = checkedCartProductList.map(({ price, quantity }) => price * quantity);
    const totalPrice = sum(priceList);
    const isAllChecked =
      cartProductList.length !== 0 && checkedIdList.length === cartProductList.length;

    return [totalPrice, isAllChecked];
  }, [cartProductList, checkedIdList]);

  const handleEntireCheckButtonClick = () => {
    checkedIdList.length === cartProductList.length
      ? setCheckedIdList([])
      : setCheckedIdList(cartProductList.map(({ id }) => id));
  };

  const handleCheckButtonClick = (id: number) => {
    isExistInList<number>(checkedIdList, id)
      ? setCheckedIdList(checkedIdList.filter((checkedId) => checkedId !== id))
      : setCheckedIdList((prev) => [...prev, id]);
  };

  return {
    data: { ...(state as CartProductListState), totalPrice },
    checkedIdListState: {
      checkedIdList,
      setCheckedIdList,
      isAllChecked,
    },
    handleEntireCheckButtonClick,
    handleCheckButtonClick,
  };
};

export default useCartList;
