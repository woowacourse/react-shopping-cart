import React from 'react';

import Image from 'components/Image';
import TrashcanButtonStyled from './style';
import { useSelector, useDispatch } from 'react-redux';
import { requestProductDelete } from 'modules/cart';

function TrashcanButton({ productId }) {
  const carts = useSelector((state) => state.cart.carts);
  const cartsIdx = carts.map((product) => product.id);
  const productIdx = cartsIdx.indexOf(productId);

  const dispatch = useDispatch();

  const handleClickTrashButton = () => {
    if (window.confirm('선택하신 상품을 삭제하시겠습니까?')) {
      const newCarts = [...carts];
      newCarts.splice(productIdx, 1);

      dispatch(requestProductDelete(newCarts));
    }
  };

  return (
    <TrashcanButtonStyled>
      <Image
        src={process.env.PUBLIC_URL + '/img/trashcan.png'}
        width="24px"
        height="24px"
        alt="휴지통 이미지"
        onClick={handleClickTrashButton}
      />
    </TrashcanButtonStyled>
  );
}

export default TrashcanButton;
