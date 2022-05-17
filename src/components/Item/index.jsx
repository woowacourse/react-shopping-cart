import React, {useState} from 'react';
//import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';

//import {ADD_CART} from 'store/modules/cart';

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

export default function Item({itemImgURL, itemName, itemPrice, id, disabled}) {
  const [disable, setDisable] = useState(disabled);

  const navigation = useNavigate();
  //const dispatch = useDispatch();

  const handleImageClick = () => navigation(`${PATH.DETAIL}/${id}`);

  const handleCartIconClick = () => {
    setDisable(true);
    //dispatch({type: ADD_CART, payload: {id, itemImgURL, itemName, itemPrice, count: 1}});
  };

  return (
    <ItemWrapper>
      <ItemImageWrapper>
        <img
          src={itemImgURL}
          alt="상품 이미지"
          width="282px"
          height="282px"
          onClick={handleImageClick}
        />
      </ItemImageWrapper>

      <InfoWrapper>
        <NamePriceWrapper>
          <ItemNameWrapper to={`${PATH.DETAIL}/${id}`}>{itemName}</ItemNameWrapper>
          <ItemPriceWrapper>{itemPrice} 원</ItemPriceWrapper>
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
