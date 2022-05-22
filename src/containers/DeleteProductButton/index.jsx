import React from 'react';
import { useDispatch } from 'react-redux';

import Button from 'components/Button';

import { deleteSelectProductCart } from 'apis/cart';

function DeleteProductButton() {
  const dispatch = useDispatch();

  const handleDeleteProduct = () => {
    dispatch(deleteSelectProductCart());
  };

  return (
    <Button
      onClick={handleDeleteProduct}
      width="118px"
      height="50px"
      fontSize="16px"
      border="1px solid black"
    >
      상품삭제
    </Button>
  );
}

export default DeleteProductButton;
