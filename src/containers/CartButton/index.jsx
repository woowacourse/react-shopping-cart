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
    // 만약, id가 carts에 이미 존재한다면 -> 개수를 추가한다
    // 최초 추가될 때, product 속성에 개수 속성:1을 더해줄까?
    const productsId = carts.map((cart) => Number(cart.id));
    if (productsId.includes(id)) {
      // 수량을 업데이트 해주는 dispatch 액션 추가

      // 1. id가 같은 인덱스를 찾는다
      const productIdx = productsId.indexOf(id);
      // 2. 그 인덱스의 qunatity에 +1을 해준다 (위에서 인덱스 던져주기, dispatch 액션)
      const newCarts = [...carts];
      newCarts[productIdx].quantity += 1;

      dispatch(requestExistProductAdd(newCarts));
      return;
    }
    try {
      const res = await axios.get(`/products/${id}`);
      const product = await res.data;

      dispatch(requestCartAdd({ ...product, quantity: 1 }));
    } catch (error) {
      dispatch(requestCartAddFail(error));
    }
    console.log(carts);
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
