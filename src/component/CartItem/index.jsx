import React from 'react';
import PropTypes from 'prop-types';

import Button from 'component/common/Button';
import CheckBox from 'component/common/CheckBox';

import {ReactComponent as DeleteIcon} from 'assets/deleteIcon.svg';
import {CartItemWrapper, EditQuantityWrapper, ItemNameWrapper} from 'component/CartItem/style';

function CartItem({itemImgURL, itemName, itemPrice, count}) {
  return (
    <CartItemWrapper>
      <CheckBox />
      <img src={itemImgURL} alt="이미지" width="144px" height="144px" />
      <ItemNameWrapper>{itemName}</ItemNameWrapper>
      <EditQuantityWrapper>
        <Button>
          <DeleteIcon />
        </Button>
        <div>{count} 개</div>
        <div>{itemPrice}원</div>
      </EditQuantityWrapper>
    </CartItemWrapper>
  );
}

CartItem.propTypes = {
  itemImgURL: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.number,
  count: PropTypes.number,
  id: PropTypes.number,
};

export default CartItem;
