import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useGlobalState from 'hooks/useGlobalState';
import { CartProductListState } from 'store/cartProductList/reducer';
import { isExistInList, sum } from 'utils';

const useCartList = () => {
  const navigate = useNavigate();
  const { dispatch, state } = useGlobalState('cart');
  const [checkedIdList, setCheckedIdList] = useState<number[]>([]);

  const { cartProductList } = state as CartProductListState;

  const [totalPrice, isAllChecked] = useMemo(() => {
    const checkedCartProductList = cartProductList.filter(({ id }) =>
      isExistInList<number>(checkedIdList, id),
    );

    const totalPrice = sum(checkedCartProductList.map(({ quantity, price }) => quantity * price));

    const isAllChecked =
      cartProductList.length !== 0 && checkedIdList.length === cartProductList.length;

    return [totalPrice, isAllChecked];
  }, [cartProductList, checkedIdList]);

  return {
    dispatch,
    navigate,
    data: { ...(state as CartProductListState), totalPrice },
    checkedIdListState: {
      checkedIdList,
      setCheckedIdList,
      isAllChecked,
    },
  };
};

export default useCartList;
