import React from 'react';

import * as Styled from 'components/cart/OrderContainer/OrderContainer.style';
import useCart from 'hooks/useCart';

function OrderContainer() {
  const { checkedProductCount, totalPrice } = useCart();

  return (
    <Styled.Container>
      <Styled.Title>결제예상금액</Styled.Title>
      <Styled.Content>
        <Styled.ExpectedPriceWrapper>
          <Styled.Label>결제예상금액</Styled.Label>
          <Styled.Price>{totalPrice}원</Styled.Price>
        </Styled.ExpectedPriceWrapper>
        <Styled.Button disabled={checkedProductCount === 0}>
          주문하기 ({checkedProductCount}개)
        </Styled.Button>
      </Styled.Content>
    </Styled.Container>
  );
}

export default OrderContainer;
