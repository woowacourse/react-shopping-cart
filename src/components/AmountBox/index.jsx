import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/common/Button';

import {
  AmountBoxWrapper,
  AmountBoxHeaderWrapper,
  PriceInfoWrapper,
} from 'components/AmountBox/style';

// 앞으로 type이 더 많아져도 여기저기서 쓸 수 있도록 만들고 싶음
// 부모에서 props로 다 전달해주기 vs 객체 형식으로 만들어서 constant에서 가져다 쓰기
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

function AmountBox({type = 'cart', totalCount, totalPrice}) {
  return (
    <AmountBoxWrapper>
      <AmountBoxHeaderWrapper>{amountBoxType[type].header}</AmountBoxHeaderWrapper>
      <PriceInfoWrapper>
        <p>{amountBoxType[type].priceInfo}</p>
        <p>{totalPrice}원</p>
      </PriceInfoWrapper>
      <Button backgroundColor="brown" width="100%" height="73px">
        {amountBoxType[type].buttonText(totalCount, totalPrice)}
      </Button>
    </AmountBoxWrapper>
  );
}

AmountBox.propTypes = {
  type: PropTypes.string,
  totalCount: PropTypes.number,
  totalPrice: PropTypes.number,
};

export default AmountBox;
