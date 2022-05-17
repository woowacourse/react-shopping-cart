import React from 'react';
import PropTypes from 'prop-types';
//import {useDispatch} from 'react-redux';

//import {DELETE_CART} from 'store/modules/cart';

import Button from 'components/common/Button';
import CheckBox from 'components/common/CheckBox';

import {ReactComponent as DeleteIcon} from 'assets/deleteIcon.svg';
import {CartItemWrapper, EditQuantityWrapper, ItemNameWrapper} from 'components/CartItem/style';

function CartItem({itemImgURL, itemName, itemPrice = 0, count, id}) {
  //const dispatch = useDispatch();

  const handleDeleteIconClick = () => {
    //dispatch({type: DELETE_CART, payload: id});
  };

  return (
    <CartItemWrapper>
      <CheckBox />
      <img src={itemImgURL} alt={`${itemName} 장바구니 이미지`} width="144px" height="144px" />
      <ItemNameWrapper>{itemName}</ItemNameWrapper>
      <EditQuantityWrapper>
        <Button
          onClick={() => {
            handleDeleteIconClick(id);
          }}
        >
          <DeleteIcon />
        </Button>
        <div>{count} 개</div>
        <div>{itemPrice.toLocaleString()}원</div>
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
