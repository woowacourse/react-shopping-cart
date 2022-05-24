import React from 'react';

import Checkbox from 'components/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import {
  requestAllCheckboxTrue,
  requestAllCheckboxFalse,
  requestProductAllCheck,
} from 'modules/cart';

function AllCheckbox() {
  const carts = useSelector((state) => state.cart.carts);
  const isCheckedAll = useSelector((state) => state.cart.isCheckedAll);
  const dispatch = useDispatch();

  // 모든 상품이 체크가 된 경우, all checkbox도 체크 상태로 만들어준다
  if (carts.length && carts.every((product) => product.isChecked)) {
    dispatch(requestAllCheckboxTrue());
  } else {
    dispatch(requestAllCheckboxFalse());
  }

  const handleClickCheckbox = () => {
    dispatch(requestProductAllCheck());
  };

  return <Checkbox label="선택해제" onClick={handleClickCheckbox} isChecked={isCheckedAll} />;
}

export default AllCheckbox;
