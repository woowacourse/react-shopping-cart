import React from 'react';
import PropTypes from 'prop-types';

import Button from 'component/common/Button';

import {DetailItemWrapper, ItemNameWrapper, ItemPriceWrapper} from 'component/DetailItem/style';

export default function Item({itemImgURL, itemName, itemPrice}) {
  return (
    <DetailItemWrapper>
      <img src={itemImgURL} alt="이미지" width="570px" height="570px" />
      <ItemNameWrapper>{itemName}</ItemNameWrapper>
      <ItemPriceWrapper>
        <div>금액</div>
        <div>{itemPrice}원</div>
      </ItemPriceWrapper>
      <Button backgroundColor="#73675C" width="640px" height="100px">
        장바구니
      </Button>
    </DetailItemWrapper>
  );
}

Item.propTypes = {
  itemImgURL: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.string,
};
