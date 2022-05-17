import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/common/Button';

import {
  AmountBoxWrapper,
  AmountBoxHeaderWrapper,
  PriceInfoWrapper,
} from 'components/AmountBox/style';

function AmountBox({type = 'expect', totalCount, totalPrice}) {
  return (
    <AmountBoxWrapper>
      <AmountBoxHeaderWrapper>
        {type === 'expect' ? '결제예상금액' : '결제금액'}
      </AmountBoxHeaderWrapper>
      <PriceInfoWrapper>
        <p>{type === 'expect' ? '결제예상금액' : '총 결제금액'}</p>
        <p>{totalPrice}원</p>
      </PriceInfoWrapper>
      <Button backgroundColor="brown" width="100%" height="73px">
        {type === 'expect' ? `주문하기(${totalCount}개)` : `${totalPrice}원 결제하기`}
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
