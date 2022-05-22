import React from 'react';
import axios from 'axios';

import Image from 'components/Image';
import { useDispatch, useSelector } from 'react-redux';
import { requestCartAdd, requestCartAddFail } from 'modules/cart';

function CartButton({ id }) {
  const carts = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();

  const handleCartButtonClick = async () => {
    try {
      const res = await axios.get(`/products/${id}`);
      const product = await res.data;

      dispatch(requestCartAdd(product));
    } catch (error) {
      dispatch(requestCartAddFail(error));
    }
    console.log(carts);
  };

  return (
    <Image
      src={process.env.PUBLIC_URL + '/img/shopping-cart-black.png'}
      width={'30px'}
      height={'26px'}
      alt="카트 이미지"
      onClick={handleCartButtonClick}
    />
  );
}

export default CartButton;
