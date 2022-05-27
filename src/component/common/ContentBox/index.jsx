import React from 'react';
import PropTypes from 'prop-types';

import Button from 'component/common/Button';

import * as S from 'component/common/ContentBox/style';

import theme from 'theme/theme';

export default function ContentBox({
  headerText = 'box header',
  leftContent = 'left content',
  rightContent = 'right content',
  buttonText = 'button',
  onClickButton = () => void 0,
}) {
  return (
    <S.ContentBoxLayout>
      <S.ContentBoxHeader>{headerText}</S.ContentBoxHeader>
      <S.PriceInfoBox>
        <S.PriceInfoFont>{leftContent}</S.PriceInfoFont>
        <S.PriceInfoFont>{rightContent}</S.PriceInfoFont>
      </S.PriceInfoBox>
      <Button onClick={onClickButton} backgroundColor={theme.MINT} width="100%" height="73px">
        <S.PriceInfoFont>{buttonText}</S.PriceInfoFont>
      </Button>
    </S.ContentBoxLayout>
  );
}

ContentBox.propTypes = {
  headerText: PropTypes.string,
  leftContent: PropTypes.string,
  rightContent: PropTypes.string,
  buttonText: PropTypes.string,
  onClickButton: PropTypes.func,
};
