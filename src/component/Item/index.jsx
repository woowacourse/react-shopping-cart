import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';

import {ADD_CART} from 'store/modules/cart';

import {ReactComponent as BlackCartIcon} from 'assets/blackCartIcon.svg';
import Button from 'component/common/Button';

import {PATH} from 'constant';

import * as S from 'component/Item/style';

export default function Item({itemImgURL, itemName, itemPrice, id, disabled}) {
  const [disable, setDisable] = useState(disabled);

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleImageClick = () =>
    navigation(`${PATH.DETAIL}/${id}`, {
      state: {itemImgURL, itemName, itemPrice, id, disable},
    });

  const handleCartIconClick = () => {
    setDisable(true);
    dispatch({type: ADD_CART, payload: {id, itemImgURL, itemName, itemPrice, count: 1}});
  };

  return (
    <S.ItemLayout>
      <img
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
        <Button disabled={disable} onClick={handleCartIconClick}>
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
};
