import React from 'react';

import { requestCheckedProductDelete } from 'modules/cart/cart';
import { useDispatch } from 'react-redux';
import MESSAGE from 'constants';
import DeleteProductButtonStyled from './style';

function DeleteProductButton() {
  const dispatch = useDispatch();

  const handleClickDeleteButton = () => {
    if (window.confirm(MESSAGE.DELETE_CONFIRM)) {
      dispatch(requestCheckedProductDelete());
    }
  };

  return (
    <DeleteProductButtonStyled onClick={handleClickDeleteButton}>
      상품삭제
    </DeleteProductButtonStyled>
  );
}

export default DeleteProductButton;
