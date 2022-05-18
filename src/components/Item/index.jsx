import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';

import {ReactComponent as BlackCartIcon} from 'assets/blackCartIcon.svg';
import Button from 'components/common/Button';

import {PATH} from 'constants';

import {
  ItemWrapper,
  ItemImageWrapper,
  NamePriceWrapper,
  InfoWrapper,
  ItemNameWrapper,
  ItemPriceWrapper,
} from 'components/Item/style';
import useReducerSelect from 'hooks/useReducerSelect';
import {postCart} from 'store/modules/cart';

export default function Item({itemImgURL, itemName, itemPrice, id, disabled}) {
  const [disable, setDisable] = useState(disabled);
  const {dispatch, pending, error, data} = useReducerSelect('cartReducer');

  const navigation = useNavigate();

  const handleImageClick = () => navigation(`${PATH.DETAIL}/${id}`);

  const handleCartIconClick = () => {
    setDisable(true);
    dispatch(postCart(id));
    console.log(pending, error, data);
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
