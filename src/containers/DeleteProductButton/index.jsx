import Button from 'components/Button';
import React from 'react';

function DeleteProductButton() {
  const handleDeleteProduct = () => {};

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
