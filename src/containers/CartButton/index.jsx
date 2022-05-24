import React from 'react';
import axios from 'axios';

import Image from 'components/Image';
import { useDispatch, useSelector } from 'react-redux';
import { requestCartAdd, requestCartAddFail, requestExistProductAdd } from 'modules/cart';
import CartButtonStyled from './style';

function CartButton({ id }) {
  const carts = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();

  const handleCartButtonClick = async () => {
    const productsId = carts.map((cart) => Number(cart.id));

    // 이미 카트에 담긴 상품일 경우, 수량을 업데이트해준다
    if (productsId.includes(id)) {
      const productIdx = productsId.indexOf(id);

      dispatch(requestExistProductAdd(productIdx));
      return;
    }
    try {
      const res = await axios.get(`/products/${id}`);
      const product = await res.data;

      dispatch(requestCartAdd(product));
    } catch (error) {
      dispatch(requestCartAddFail(error));
    }
  };

  return (
    <CartButtonStyled>
      <Image
        src={process.env.PUBLIC_URL + '/img/shopping-cart-black.png'}
        width={'30px'}
        height={'26px'}
        alt="카트 이미지"
        onClick={handleCartButtonClick}
      />
    </CartButtonStyled>
  );
}

export default CartButton;
