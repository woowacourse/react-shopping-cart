import React from 'react';
import PropTypes from 'prop-types';

import * as S from 'component/common/QuantityBox/style';

export default function QuantityBox({
  quantity = 1,
  handleIncrease = () => void 0,
  handleDecrease = () => void 0,
}) {
  return (
    <S.Layout>
      <S.QuantityFont>{quantity}</S.QuantityFont>
      <S.ButtonBox>
        <S.EditQuantityButton onClick={handleIncrease}>▲</S.EditQuantityButton>
        <S.EditQuantityButton onClick={handleDecrease}>▼</S.EditQuantityButton>
      </S.ButtonBox>
    </S.Layout>
  );
}

QuantityBox.propTypes = {
  quantity: PropTypes.number,
  handleIncrease: PropTypes.func,
  handleDecrease: PropTypes.func,
};
