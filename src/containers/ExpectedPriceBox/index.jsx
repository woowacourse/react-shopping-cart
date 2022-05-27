import React from 'react';

import PriceInfo from 'components/PriceInfo';
import { ExpectedPriceBoxStyled, OrderButtonStyled } from './style';
import { useSelector } from 'react-redux';

function ExpectedPriceBox() {
  const carts = useSelector((state) => state.cart.carts);
  const totalPrice = carts
    .filter((product) => product.isChecked)
    .map((product) => product.total)
    .reduce((total, productPrice) => total + productPrice, 0);

  return (
    <ExpectedPriceBoxStyled>
      <PriceInfo title="결제예상금액" subTitle="결제예상금액" price={totalPrice} />
      <OrderButtonStyled>주문하기</OrderButtonStyled>
    </ExpectedPriceBoxStyled>
  );
}

export default ExpectedPriceBox;
