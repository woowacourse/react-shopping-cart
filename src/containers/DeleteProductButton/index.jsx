import React from 'react';

import BoxButton from 'components/BoxButton';
import { requestCheckedProductDelete } from 'modules/cart';
import { useDispatch } from 'react-redux';
import MESSAGE from 'constants';

function DeleteProductButton() {
  const dispatch = useDispatch();

  const handleClickDeleteButton = () => {
    if (window.confirm(MESSAGE.DELETE_CONFIRM)) {
      dispatch(requestCheckedProductDelete());
    }
  };

  return (
    <BoxButton
      color="#FFF"
      message="상품삭제"
      fontSize="16px"
      width="117px"
      height="50px"
      border="#BBB"
      fontColor="#333"
      onClick={handleClickDeleteButton}
    />
  );
}

export default DeleteProductButton;
