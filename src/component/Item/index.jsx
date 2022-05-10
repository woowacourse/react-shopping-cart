import React from 'react';
import PropTypes from 'prop-types';

import Button from 'component/common/Button';
import {ReactComponent as BlackCartIcon} from 'assets/blackCartIcon.svg';

import {
  ItemWrapper,
  NamePriceWrapper,
  InfoWrapper,
  ItemNameWrapper,
  ItemPriceWrapper,
} from 'component/Item/style';

export default function Item({itemImgURL, itemName, itemPrice}) {
  return (
    <ItemWrapper>
      <img src={itemImgURL} alt="이미지" width="282px" height="282px" />
      <InfoWrapper>
        <NamePriceWrapper>
          <ItemNameWrapper>{itemName}</ItemNameWrapper>
          <ItemPriceWrapper>{itemPrice} 원</ItemPriceWrapper>
        </NamePriceWrapper>
        <Button>
          <BlackCartIcon />
        </Button>
      </InfoWrapper>
    </ItemWrapper>
  );
}

Item.propTypes = {
  itemImgURL: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.string,
};
