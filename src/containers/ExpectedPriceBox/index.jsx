import React from 'react';

import PriceInfo from 'components/PriceInfo';
import BoxButton from 'components/BoxButton';
import theme from 'style/theme';
import ExpectedPriceBoxStyled from './style';

function ExpectedPriceBox() {
  return (
    <ExpectedPriceBoxStyled>
      <PriceInfo title="결제예상금액" subTitle="결제예상금액" price="1000" />
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
