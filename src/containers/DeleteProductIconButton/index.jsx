import React from 'react';
import { useDispatch } from 'react-redux';

import Image from 'components/Image';
import Button from 'components/Button';

import { deleteProductCart } from 'apis/cart';

function ProductDeleteButton({ id }) {
  const dispatch = useDispatch();

  const handleProductDelete = ({ target }) => {
    dispatch(deleteProductCart(target.id));
  };

  return (
    <Button id={id} width="24px" height="24px" border="none">
      <Image
        onClick={handleProductDelete}
        src="img/trash.png"
        id={id}
        width="24px"
        height="24px"
        cursor="pointer"
      />
    </Button>
  );
}

export default ProductDeleteButton;
