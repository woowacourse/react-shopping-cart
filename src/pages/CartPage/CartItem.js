import React from 'react';
import { useDispatch } from 'react-redux';

import CounterButton from '../../components/CounterButton';
import IconButton from '../../components/utils/IconButton';
import PriceText from '../../components/utils/PriceText';
import CheckBox from '../../components/utils/CheckBox';
import Image from '../../components/utils/Image';
import Flex from '../../components/utils/Flex';

import bin from '../../asset/bin-icon.svg';
import { MESSAGE, NUMBER, COLOR } from '../../constant';
import { increaseQuantity, decreaseQuantity, deleteItemFromCart, toggleCheckbox } from '../../modules/cartSlice';
import { deleteItemFromCartRequest } from '../../api/products';

import styled, { css } from 'styled-components';

const SingleCartItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  box-sizing: border-box;
  width: 100%;
  height: 205px;
  padding: 25px 0;
  border-bottom: 1px solid ${COLOR.GRAY[400]};
`;

const CartItemName = styled.span`
  font-size: 20px;
  margin: 4px 21px 20px;
  color: ${COLOR.GRAY[800]};
`;

const ManageCartItemStyle = css`
  width: 146px;
  margin-left: auto;
`;

const CartItemPrice = styled.span`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;
`;

const CartItem = (props) => {
  const { singleItemInServer, checked } = props;
  const dispatch = useDispatch();

  const onIncreaseButtonClick = () => {
    dispatch(increaseQuantity(singleItemInServer.product_id));
  };

  const onDecreaseButtonClick = () => {
    if (singleItemInServer.quantity <= NUMBER.ITEM_MINIMUM_COUNT) {
      alert(MESSAGE.UNDER_MINIMUM_COUNT_LIMIT);

      return;
    }
    dispatch(decreaseQuantity(singleItemInServer.product_id));
  };

  const onDeleteItemButtonClick = () => {
    deleteItemFromCartRequest(singleItemInServer.product_id);
    dispatch(deleteItemFromCart(singleItemInServer.product_id));
  };

  const onCheckboxClick = (cartItemId) => {
    dispatch(toggleCheckbox(cartItemId));
  };

  return (
    <SingleCartItem>
      <CheckBox id={singleItemInServer.product_id} checked={checked} onChange={onCheckboxClick} />
      <Flex>
        <Image width="144px" height="144px" src={singleItemInServer.image_url} alt={singleItemInServer.name} />
        <CartItemName>{singleItemInServer.name}</CartItemName>
      </Flex>

      <Flex flexDirection="column" alignItems="flex-end" css={ManageCartItemStyle}>
        <IconButton
          src={bin}
          alt="해당 상품을 장바구니에서 삭제"
          width="24px"
          height="24px"
          onClick={onDeleteItemButtonClick}
        />
        <CounterButton
          id={singleItemInServer.name}
          onIncreaseButtonClick={onIncreaseButtonClick}
          onDecreaseButtonClick={onDecreaseButtonClick}
        />
        <CartItemPrice>
          <PriceText>{singleItemInServer.price}</PriceText>
        </CartItemPrice>
      </Flex>
    </SingleCartItem>
  );
};

export default CartItem;
