import React from 'react';
import Styled from './PriceOverview.styles';
import Button from '../../shared/Button/Button';
import HighlightText from '../../shared/HighlightText/HighlightText';
import * as T from '../../../types';

const PriceOverview = () => {
  return (
    <Styled.Root>
      <Styled.TotalPriceHeader>결제예상금액</Styled.TotalPriceHeader>
      <Styled.Divider />
      <Styled.TotalPriceContent>
        <Styled.HighlightTextWrapper>
          <HighlightText text="결제예상금액" />
          <HighlightText text="300,000원" />
        </Styled.HighlightTextWrapper>
        <Button text="주문하기(2개)" size={T.ButtonSize.LARGE} />
      </Styled.TotalPriceContent>
    </Styled.Root>
  );
};

PriceOverview.defaultProps = {};

export default PriceOverview;
