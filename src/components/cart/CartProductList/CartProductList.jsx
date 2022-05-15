import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartAsync } from '../../../store/actions/cart';
import CheckBox from '../../common/CheckBox/CheckBox';
import CartProductCard from '../CartProductCard/CartProductCard';
import * as Styled from './CartProductList.style';

function CartProductList() {
  const {
    cart: { cart },
  } = useSelector(({ cart }) => cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartAsync());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Styled.Container>
      <Styled.ListControlWrapper>
        <Styled.AllCheckControl>
          <CheckBox checked={true} />
          <Styled.CheckBoxLabel>전체 선택 해제</Styled.CheckBoxLabel>
        </Styled.AllCheckControl>
        <Styled.Button type="button">선택 상품 삭제</Styled.Button>
      </Styled.ListControlWrapper>
      <Styled.Title>장바구니 상품 목록 ({cart && Object.keys(cart).length}개)</Styled.Title>
      <Styled.ListWrapper>
        {cart &&
          Object.keys(cart).map((id) => {
            const { productData, quantity } = cart[id];
            return <CartProductCard key={id} product={productData} quantity={quantity} />;
          })}
      </Styled.ListWrapper>
    </Styled.Container>
  );
}

export default CartProductList;
