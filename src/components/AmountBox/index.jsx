import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/common/Button';

import {AmountBoxWrapper, AmountBoxHeaderBox, PriceInfoContainer} from 'components/AmountBox/style';

const amountBoxType = {
  cart: {
    header: '결제예상금액',
    priceInfo: '결제예상금액',
    buttonText(count) {
      return `주문하기(${count}개)`;
    },
  },
  pay: {
    header: '결제금액',
    priceInfo: '총 결제금액',
    buttonText(count, price) {
      return `${price}원 결제하기`;
    },
  },
};

function AmountBox({type = 'cart', totalQuantity, totalPrice}) {
  return (
    <AmountBoxWrapper>
      <AmountBoxHeaderBox>{amountBoxType[type].header}</AmountBoxHeaderBox>
      <PriceInfoContainer>
        <p>{amountBoxType[type].priceInfo}</p>
        <p>{totalPrice.toLocaleString()}원</p>
      </PriceInfoContainer>
      <Button buttonType="mintBackground" buttonSizeType="l" disabled={totalQuantity === 0}>
        {amountBoxType[type].buttonText(totalQuantity, totalPrice)}
      </Button>
    </AmountBoxWrapper>
  );
}

AmountBox.propTypes = {
  type: PropTypes.string,
  totalQuantity: PropTypes.number,
  totalPrice: PropTypes.number,
};

export default AmountBox;
