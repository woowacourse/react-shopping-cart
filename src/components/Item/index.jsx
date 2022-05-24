import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';

import useCart from 'hooks/useCart';

import {ReactComponent as BlackCartIcon} from 'assets/blackCartIcon.svg';
import Button from 'components/common/Button';

import {PATH} from 'constants/path';

import {
  ItemWrapper,
  ItemImageContainer,
  NamePriceContainer,
  InfoWrapper,
  ItemNameBox,
  ItemPriceBox,
} from 'components/Item/style';
import {Image} from 'components/common/style';

export default function Item({itemImgURL, itemName, itemPrice = 0, id, disabled}) {
  const [disable, setDisable] = useState(disabled);
  const {postCartItem} = useCart();

  const navigation = useNavigate();

  const handleImageClick = () => navigation(`${PATH.DETAIL}/${id}`);

  const handleCartIconClick = () => {
    setDisable(true);
    postCartItem(id);
  };

  return (
    <ItemWrapper>
      <ItemImageContainer>
        <Image
          src={itemImgURL}
          alt={`${itemName}상품 이미지`}
          imgSize="m"
          onClick={handleImageClick}
        />
      </ItemImageContainer>

      <InfoWrapper>
        <NamePriceContainer>
          <ItemNameBox to={`${PATH.DETAIL}/${id}`}>{itemName}</ItemNameBox>
          <ItemPriceBox>{itemPrice.toLocaleString()}원</ItemPriceBox>
        </NamePriceContainer>
        <Button disabled={disable} onClick={handleCartIconClick}>
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
  disabled: PropTypes.bool,
};
