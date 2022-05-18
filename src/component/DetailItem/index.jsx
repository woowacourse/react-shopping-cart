import React from 'react';
import PropTypes from 'prop-types';

import Button from 'component/common/Button';

import * as S from 'component/DetailItem/style';
import theme from 'theme/theme';

export default function DetailItem({
  itemImgURL,
  itemName,
  itemPrice,
  disabled,
  handleCartButtonClick = () => void 0,
}) {
  return (
    <S.DetailItemLayout>
      <img src={itemImgURL} alt="상품 이미지" width="570px" height="570px" />
      <S.ItemNameSpan>{itemName}</S.ItemNameSpan>
      <S.ItemPriceBox>
        <span>금액</span>
        <S.PriceFont fontSize="32px">{itemPrice.toLocaleString()}원</S.PriceFont>
      </S.ItemPriceBox>
      <Button
        backgroundColor={theme.GRAY_BROWN}
        width="640px"
        height="100px"
        onClick={handleCartButtonClick}
        disabled={disabled}
      >
        장바구니
      </Button>
    </S.DetailItemLayout>
  );
}

DetailItem.propTypes = {
  id: PropTypes.number,
  itemImgURL: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.number,
  disabled: PropTypes.bool,
  handleCartButtonClick: PropTypes.func,
};
