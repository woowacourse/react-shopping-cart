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
import { increaseQuantity, decreaseQuantity, deleteItemFromCart } from '../../modules/cartSlice';
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

const CartItem = ({ cartItem, checked, onCheckboxClick }) => {
  const dispatch = useDispatch();

  const onIncreaseButtonClick = () => {
    dispatch(increaseQuantity(cartItem.product_id));
  };

  const onDecreaseButtonClick = () => {
    if (cartItem.quantity <= NUMBER.ITEM_MINIMUM_COUNT) {
      alert(MESSAGE.UNDER_MINIMUM_COUNT_LIMIT);
      return;
    }

    dispatch(decreaseQuantity(cartItem.product_id));
  };

  const onDeleteItemButtonClick = () => {
    deleteItemFromCartRequest(cartItem.product_id);

    dispatch(deleteItemFromCart(cartItem.product_id));
  };

  return (
    <SingleCartItem>
      <CheckBox id={cartItem.product_id} checked={checked} onChange={onCheckboxClick} />
      <Flex>
        <Image
          width="144px"
          height="144px"
          src={cartItem.image_url}
          alt={cartItem.name}
          isBackgroundImageNeeded={true}
        />
        <CartItemName>{cartItem.name}</CartItemName>
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
          id={cartItem.product_id}
          count={cartItem.quantity}
          onIncreaseButtonClick={onIncreaseButtonClick}
          onDecreaseButtonClick={onDecreaseButtonClick}
        />
        <CartItemPrice>
          <PriceText>{cartItem.quantity * cartItem.price}</PriceText>
        </CartItemPrice>
      </Flex>
    </SingleCartItem>
  );
};

export default CartItem;
