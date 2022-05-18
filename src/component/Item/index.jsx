import React from 'react';
import PropTypes from 'prop-types';

import {ReactComponent as BlackCartIcon} from 'assets/blackCartIcon.svg';
import Button from 'component/common/Button';

import {PATH} from 'constant';

import * as S from 'component/Item/style';

export default function Item({
  itemImgURL,
  itemName,
  itemPrice,
  id,
  disabled,
  handleImageClick = () => void 0,
  handleIconClick = () => void 0,
}) {
  return (
    <S.ItemLayout>
      <S.ItemImage
        src={itemImgURL}
        alt="상품 이미지"
        width="282px"
        height="282px"
        onClick={handleImageClick}
      />
      <S.InfoBox>
        <S.NamePriceBox>
          <S.ItemNameLink to={`${PATH.DETAIL}/${id}`} state={{itemImgURL, itemName, itemPrice, id}}>
            {itemName}
          </S.ItemNameLink>
          <S.ItemPriceSpan>{itemPrice.toLocaleString()} 원</S.ItemPriceSpan>
        </S.NamePriceBox>
        <Button disabled={disabled} onClick={handleIconClick}>
          <BlackCartIcon />
        </Button>
      </S.InfoBox>
    </S.ItemLayout>
  );
}

Item.propTypes = {
  id: PropTypes.number,
  itemImgURL: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.number,
  disabled: PropTypes.bool,
  handleImageClick: PropTypes.func,
  handleIconClick: PropTypes.func,
};
