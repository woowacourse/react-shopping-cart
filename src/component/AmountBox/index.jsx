import React from 'react';
import PropTypes from 'prop-types';

import Button from 'component/common/Button';

import * as S from 'component/AmountBox/style';
import theme from 'theme/theme';

export default function AmountBox({type = 'expect', totalCount, totalPrice}) {
  return (
    <S.AmountBoxLayout>
      <S.AmountBoxHeader>{type === 'expect' ? '결제예상금액' : '결제금액'}</S.AmountBoxHeader>
      <S.PriceInfoBox>
        <S.PriceInfoFont>{type === 'expect' ? '결제예상금액' : '총 결제금액'}</S.PriceInfoFont>
        <S.PriceInfoFont>{totalPrice.toLocaleString()}원</S.PriceInfoFont>
      </S.PriceInfoBox>
      <Button backgroundColor={theme.MINT} width="100%" height="73px">
        <S.PriceInfoFont>
          {type === 'expect'
            ? `주문하기(${totalCount}개)`
            : `${totalPrice.toLocaleString()}원 결제하기`}
        </S.PriceInfoFont>
      </Button>
    </S.AmountBoxLayout>
  );
}

AmountBox.propTypes = {
  type: PropTypes.string,
  totalCount: PropTypes.number,
  totalPrice: PropTypes.number,
};
