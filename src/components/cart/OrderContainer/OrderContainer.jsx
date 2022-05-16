import React from 'react';
import * as Styled from './OrderContainer.style';

function OrderContainer() {
  return (
    <Styled.Container>
      <Styled.Title>결제예상금액</Styled.Title>
      <Styled.Content>
        <Styled.ExpectedPriceWrapper>
          <Styled.Label>결제예상금액</Styled.Label>
          <Styled.Price>n원</Styled.Price>
        </Styled.ExpectedPriceWrapper>
        <Styled.Button>주문하기 (n개)</Styled.Button>
      </Styled.Content>
    </Styled.Container>
  );
}

export default OrderContainer;
