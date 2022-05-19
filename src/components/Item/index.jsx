import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';

import {ReactComponent as BlackCartIcon} from 'assets/blackCartIcon.svg';
import Button from 'components/common/Button';

import {PATH} from 'constants/path';

import {
  ItemWrapper,
  ItemImageWrapper,
  NamePriceWrapper,
  InfoWrapper,
  ItemNameWrapper,
  ItemPriceWrapper,
} from 'components/Item/style';
import useCart from 'hooks/useCart';

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
      <ItemImageWrapper>
        <img
          src={itemImgURL}
          alt={`${itemName}상품 이미지`}
          width="282px"
          height="282px"
          onClick={handleImageClick}
        />
      </ItemImageWrapper>

      <InfoWrapper>
        <NamePriceWrapper>
          <ItemNameWrapper to={`${PATH.DETAIL}/${id}`}>{itemName}</ItemNameWrapper>
          <ItemPriceWrapper>{itemPrice.toLocaleString()} 원</ItemPriceWrapper>
        </NamePriceWrapper>
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
