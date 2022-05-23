import React from 'react';

import PriceInfo from 'components/PriceInfo';
import BoxButton from 'components/BoxButton';
import theme from 'style/theme';
import ExpectedPriceBoxStyled from './style';
import { useSelector } from 'react-redux';

function ExpectedPriceBox() {
  const carts = useSelector((state) => state.cart.carts);
  const totalPrice = carts
    .map((product) => product.total)
    .reduce((total, productPrice) => total + productPrice, 0);

  return (
    <ExpectedPriceBoxStyled>
      <PriceInfo title="결제예상금액" subTitle="결제예상금액" price={totalPrice} />
      <BoxButton
        color={theme.mainColor}
        message="주문하기"
        fontSize="24px"
        width="388px"
        height="73px"
        fontColor="#FFF"
      />
    </ExpectedPriceBoxStyled>
  );
}

export default ExpectedPriceBox;
