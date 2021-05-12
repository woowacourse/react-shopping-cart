import React from 'react';
import { useDispatch } from 'react-redux';

import CounterButton from '../../components/CounterButton';
import IconButton from '../../components/utils/IconButton';
import PriceText from '../../components/utils/PriceText';
import CheckBox from '../../components/utils/CheckBox';
import Image from '../../components/utils/Image';

import bin from '../../asset/bin-icon.svg';
import styled from 'styled-components';

import { increaseQuantity, decreaseQuantity, deleteItem } from '../../modules/cart';

const SingleCartItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  box-sizing: border-box;
  width: 100%;
  height: 205px;
  padding: 25px 0;
  border-bottom: 1px solid #cccccc;
`;

const ItemContents = styled.div`
  display: flex;
`;

const CartItemName = styled.span`
  font-size: 20px;
  margin: 4px 21px 20px;
  color: #333333;
`;

const ManageCartItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 146px;
  margin-left: auto;
`;

const CartItemPrice = styled.span`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;
`;

const CartItem = ({ cartItem, checked, onCheckboxClick }) => {
  const dispatch = useDispatch();

  const onIncreaseButtonClick = () => {
    dispatch(increaseQuantity(cartItem.id));
  };

  const onDecreaseButtonClick = () => {
    dispatch(decreaseQuantity(cartItem.id));
  };

  const onDeleteItemButtonClick = () => {
    dispatch(deleteItem(cartItem.id));
  };

  return (
    <SingleCartItem>
      <CheckBox id={cartItem.id} checked={checked} onChange={onCheckboxClick} />
      <ItemContents>
        <Image width="144px" height="144px" src={cartItem.image} alt={cartItem.name} isBackgroundImageNeeded={true} />
        <CartItemName>{cartItem.name}</CartItemName>
      </ItemContents>

      <ManageCartItem>
        <IconButton
          src={bin}
          alt="해당 상품을 장바구니에서 삭제"
          width="24px"
          height="24px"
          onClick={onDeleteItemButtonClick}
        />
        <CounterButton
          id={cartItem.id}
          count={cartItem.quantity}
          onIncreaseButtonClick={onIncreaseButtonClick}
          onDecreaseButtonClick={onDecreaseButtonClick}
        />
        <CartItemPrice>
          <PriceText>{cartItem.quantity * cartItem.price}</PriceText>
        </CartItemPrice>
      </ManageCartItem>
    </SingleCartItem>
  );
};

export default CartItem;
