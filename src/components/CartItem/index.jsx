import React from 'react';
import PropTypes from 'prop-types';

import useCart from 'hooks/useCart';

import Button from 'components/common/Button';
import CheckBox from 'components/common/CheckBox';

import {ReactComponent as DeleteIcon} from 'assets/deleteIcon.svg';

import {CartItemWrapper, ItemNameBox, ItemCountBox} from 'components/CartItem/style';
import {FlexRowWrapper, FlexColWrapper, Image} from 'components/common/style';
import {MESSAGE} from 'constants';
function CartItem({itemImgURL, itemName, itemPrice = 0, quantity, id, checked, onChange}) {
  const {addQuantity, minusQuantity, deleteItem} = useCart();

  const handleDeleteIconClick = () => {
    if (confirm(MESSAGE.DELETE_ITEM)) {
      deleteItem(id);
      if (checked) onChange(id);
    }
  };

  return (
    <CartItemWrapper>
      <CheckBox onChange={onChange} checked={checked} />
      <Image src={itemImgURL} alt={`${itemName} 장바구니 이미지`} imgSize="s" />
      <ItemNameBox>{itemName}</ItemNameBox>
      <FlexColWrapper alignItems="flex-end" justifyContent="space-between" width="115px">
        <Button
          onClick={() => {
            handleDeleteIconClick(id);
          }}
        >
          <DeleteIcon />
        </Button>
        <FlexRowWrapper height="144px" alignItems="space-between">
          <FlexRowWrapper justifyContent="flex-end">
            <ItemCountBox>{quantity}</ItemCountBox>
            <FlexColWrapper width="42px">
              <Button
                buttonType="grayBorder"
                buttonSizeType="s"
                onClick={() => {
                  addQuantity(id);
                }}
              >
                ▲
              </Button>
              <Button
                buttonType="grayBorder"
                buttonSizeType="s"
                onClick={() => {
                  minusQuantity(id);
                }}
                disabled={quantity === 1}
              >
                ▼
              </Button>
            </FlexColWrapper>
          </FlexRowWrapper>
        </FlexRowWrapper>
        <div>{(itemPrice * quantity).toLocaleString()}원</div>
      </FlexColWrapper>
    </CartItemWrapper>
  );
}

CartItem.propTypes = {
  itemImgURL: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.number,
  quantity: PropTypes.number,
  id: PropTypes.number,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default CartItem;
