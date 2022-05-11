import React from 'react';
import PropTypes from 'prop-types';

import Button from 'component/common/Button';
import Input from 'component/common/Input';
import CheckBox from 'component/common/CheckBox';

import {ReactComponent as DeleteIcon} from 'assets/deleteIcon.svg';
import {CartItemWrapper, EditQuantityWrapper, ItemNameWrapper} from 'component/CartItem/style';

function CartItem({itemImgURL, itemName, itemPrice}) {
  return (
    <CartItemWrapper>
      <CheckBox />
      <img src={itemImgURL} alt="이미지" width="144px" height="144px" />
      <ItemNameWrapper>{itemName}</ItemNameWrapper>
      <EditQuantityWrapper>
        <Button>
          <DeleteIcon />
        </Button>
        <Input />
        <div>{itemPrice}원</div>
      </EditQuantityWrapper>
    </CartItemWrapper>
  );
}

CartItem.propTypes = {
  itemImgURL: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.string,
};

export default CartItem;
