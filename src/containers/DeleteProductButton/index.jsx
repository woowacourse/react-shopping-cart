import React from 'react';

import BoxButton from 'components/BoxButton';
import { requestCheckedProductDelete } from 'modules/cart';
import { useSelector, useDispatch } from 'react-redux';

function DeleteProductButton() {
  const carts = useSelector((state) => state.cart.carts);

  const dispatch = useDispatch();

  const handleClickDeleteButton = () => {
    if (window.confirm('선택하신 상품을 삭제하시겠습니까?')) {
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
