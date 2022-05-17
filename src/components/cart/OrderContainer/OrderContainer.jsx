import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import * as Styled from './OrderContainer.style';

function OrderContainer() {
  const { cart, checkedProductList } = useSelector(({ cart }) => cart);

  const totalPrice = useMemo(
    () =>
      cart &&
      checkedProductList &&
      checkedProductList.reduce((total, productId) => {
        const { productData, quantity } = cart[productId];
        return total + productData.price * quantity;
      }, 0),
    [checkedProductList, cart],
  );
  return (
    <Styled.Container>
      <Styled.Title>결제예상금액</Styled.Title>
      <Styled.Content>
        <Styled.ExpectedPriceWrapper>
          <Styled.Label>결제예상금액</Styled.Label>
          <Styled.Price>{totalPrice}원</Styled.Price>
        </Styled.ExpectedPriceWrapper>
        <Styled.Button disabled={checkedProductList.length === 0}>
          주문하기 ({checkedProductList.length}개)
        </Styled.Button>
      </Styled.Content>
    </Styled.Container>
  );
}

export default OrderContainer;
