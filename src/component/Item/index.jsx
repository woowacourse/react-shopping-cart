import React from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';

import Button from 'component/common/Button';
import {ADD_CART} from 'store/modules/cart';

import {ReactComponent as BlackCartIcon} from 'assets/blackCartIcon.svg';

import {
  ItemWrapper,
  NamePriceWrapper,
  InfoWrapper,
  ItemNameWrapper,
  ItemPriceWrapper,
} from 'component/Item/style';

export default function Item({itemImgURL, itemName, itemPrice, id}) {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleImageClick = () => {
    navigation(`detail/${id}`, {
      state: {itemImgURL, itemName, itemPrice},
    });
  };

  const handleCartIconClick = (id) => {
    dispatch({type: ADD_CART, payload: {id, itemImgURL, itemName, itemPrice, count: 1}});
  };

  return (
    <ItemWrapper>
      <img
        src={itemImgURL}
        alt="상품 이미지"
        width="282px"
        height="282px"
        onClick={handleImageClick}
      />
      <InfoWrapper>
        <NamePriceWrapper>
          <ItemNameWrapper to={`detail/${id}`} state={{itemImgURL, itemName, itemPrice}}>
            {itemName}
          </ItemNameWrapper>
          <ItemPriceWrapper>{itemPrice} 원</ItemPriceWrapper>
        </NamePriceWrapper>
        <Button onClick={() => handleCartIconClick(id, itemImgURL, itemName, itemPrice)}>
          <BlackCartIcon />
        </Button>
      </InfoWrapper>
    </ItemWrapper>
  );
}

Item.propTypes = {
  id: PropTypes.number,
  itemImgURL: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.number,
};
