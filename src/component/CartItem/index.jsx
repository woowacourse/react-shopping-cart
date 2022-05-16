import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';

import {CART} from 'store/modules/cart';

import Button from 'component/common/Button';
import CheckBox from 'component/common/CheckBox';

import {ReactComponent as DeleteIcon} from 'assets/deleteIcon.svg';
import * as S from 'component/CartItem/style';

function CartItem({itemImgURL, itemName, itemPrice, count, id}) {
  const dispatch = useDispatch();

  const handleDeleteIconClick = (id) => {
    dispatch({type: CART.DELETE, payload: id});
  };

  return (
    <S.CartItemLayout>
      <CheckBox id={id} />
      <img src={itemImgURL} alt={itemName} width="144px" height="144px" />
      <S.ItemNameParagraph>{itemName}</S.ItemNameParagraph>
      <S.EditQuantityBox>
        <Button
          onClick={() => {
            handleDeleteIconClick(id);
          }}
        >
          <DeleteIcon />
        </Button>
        <div>{count} 개</div>
        <div>{itemPrice.toLocaleString()}원</div>
      </S.EditQuantityBox>
    </S.CartItemLayout>
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
