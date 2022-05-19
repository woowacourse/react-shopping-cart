import React from 'react';
import PropTypes from 'prop-types';

import useReducerSelect from 'hooks/useReducerSelect';
import {deleteCart, editCart} from 'store/modules/cart';

import Button from 'components/common/Button';
import CheckBox from 'components/common/CheckBox';

import {ReactComponent as DeleteIcon} from 'assets/deleteIcon.svg';

import {ItemNameWrapper, ItemCountBox} from 'components/CartItem/style';
import {FlexWrapper} from 'components/common/style';

function CartItem({itemImgURL, itemName, itemPrice = 0, quantity, id, checked, onChange}) {
  const {dispatch, pending, error, data} = useReducerSelect('cartReducer');

  const handleDeleteIconClick = () => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      dispatch(deleteCart(id));
      onChange();
    } else {
      console.log(pending, error, data);
    }
  };

  const addQuantity = () => {
    dispatch(editCart(id, quantity + 1));
  };

  const minusQuantity = () => {
    dispatch(editCart(id, quantity - 1));
  };

  return (
    <FlexWrapper gap="15px" height="200px" justifyContent="flex-start">
      <CheckBox onChange={onChange} checked={checked} />
      <img src={itemImgURL} alt={`${itemName} 장바구니 이미지`} width="144px" height="144px" />
      <ItemNameWrapper>{itemName}</ItemNameWrapper>
      <FlexWrapper
        direction="column"
        alignItems="flex-end"
        justifyContent="space-between"
        width="115px"
      >
        <Button
          onClick={() => {
            handleDeleteIconClick(id);
          }}
        >
          <DeleteIcon />
        </Button>
        <FlexWrapper>
          <ItemCountBox>{quantity}</ItemCountBox>
          <FlexWrapper direction="column" width="42px">
            <Button width="42px" height="30px" buttonType="grayBorder" onClick={addQuantity}>
              ▲
            </Button>
            <Button
              width="42px"
              height="30px"
              buttonType="grayBorder"
              onClick={minusQuantity}
              disabled={quantity === 1}
            >
              ▼
            </Button>
          </FlexWrapper>
        </FlexWrapper>
        <div>{itemPrice.toLocaleString()}원</div>
      </FlexWrapper>
    </FlexWrapper>
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
