import { ReactComponent as DeleteIcon } from 'assets/deleteIcon.svg';
import CheckBox from 'components/common/CheckBox';
import CroppedImage from 'components/common/CroppedImage';
import React from 'react';
import styled from 'styled-components';
import { CartItem, Item } from 'types/domain';

import QuantityBox from './QuantityBox';

interface CartItemContainerProps {
  item: Item;
  cartItem: CartItem;
  handleClickCheckBox: () => void;
  handleQuantity: () => void;
}

const CartItemContainer = ({
  item,
  cartItem,
  handleClickCheckBox,
  handleQuantity,
}: CartItemContainerProps) => {
  const { thumbnailUrl, price, title } = item;

  return (
    <StyledCartItem>
      <CheckBox checked={cartItem.isSelected} onClick={handleClickCheckBox} />
      <CroppedImage src={thumbnailUrl} width='144px' height='144px' alt={title} />
      <p>{title}</p>
      <StyledRight>
        <DeleteIcon />
        <QuantityBox quantity={cartItem.quantity} handleChange={handleQuantity} />
        <p>{price.toLocaleString()}원</p>
      </StyledRight>
    </StyledCartItem>
  );
};

export default CartItemContainer;

const StyledCartItem = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.font};
  width: 735px;
  height: 181px;

  & > p {
    font-size: 20px;
    flex: 1;
  }

  & > :nth-of-type(1) {
    margin-left: 10px;
  }
  & > :nth-of-type(2) {
    margin-left: 15px;
  }
`;

const StyledRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;

  & > p {
    font-size: 16px;
  }
`;
