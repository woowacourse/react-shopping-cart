import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

import {ADD_CART} from 'store/modules/cart';

import Button from 'component/common/Button';

import * as S from 'component/DetailItem/style';
import {COLOR} from 'constant';
import {Font} from 'style/common';

export default function DetailItem({itemImgURL, itemName, itemPrice, id, disabled}) {
  const [disable, setDisable] = useState(disabled);
  const dispatch = useDispatch();

  const handleCartButtonClick = () => {
    setDisable(true);
    dispatch({type: ADD_CART, payload: {itemImgURL, itemName, itemPrice, id, count: 1}});
  };

  return (
    <S.DetailItemLayout>
      <img src={itemImgURL} alt="상품 이미지" width="570px" height="570px" />
      <S.ItemNameSpan>{itemName}</S.ItemNameSpan>
      <S.ItemPriceBox>
        <span>금액</span>
        <Font fontSize="32px">{itemPrice.toLocaleString()}원</Font>
      </S.ItemPriceBox>
      <Button
        backgroundColor={COLOR.BROWN}
        width="640px"
        height="100px"
        onClick={handleCartButtonClick}
        disabled={disable}
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
};
