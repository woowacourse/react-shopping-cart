import React from 'react';
import { useDispatch } from 'react-redux';

import CounterButton from '../../components/CounterButton';
import IconButton from '../../components/utils/IconButton';
import CheckBox from '../../components/utils/CheckBox';
import Image from '../../components/utils/Image';

import bin from '../../asset/bin-icon.svg';
import styled from 'styled-components';

import { increaseQuantity, decreaseQuantity } from '../../modules/cart';

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

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const onIncreaseButtonClick = () => {
    dispatch(increaseQuantity(cartItem.id));
  };

  const onDecreaseButtonClick = () => {
    dispatch(decreaseQuantity(cartItem.id));
  };

  return (
    <SingleCartItem>
      <CheckBox id={cartItem.id} />
      <ItemContents>
        <Image width="144px" height="144px" src={cartItem.image} alt={cartItem.name} isBackgroundImageNeeded={true} />
        <CartItemName>{cartItem.name}</CartItemName>
      </ItemContents>

      <ManageCartItem>
        <IconButton src={bin} alt="아이템 삭제 버튼" width="24px" height="24px" />
        <CounterButton
          id={cartItem.id}
          count={cartItem.quantity}
          onIncreaseButtonClick={onIncreaseButtonClick}
          onDecreaseButtonClick={onDecreaseButtonClick}
        />
        <CartItemPrice>{cartItem.quantity * cartItem.price}원</CartItemPrice>
      </ManageCartItem>
    </SingleCartItem>
  );
};

export default CartItem;
