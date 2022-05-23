import React from 'react';
import styled from 'styled-components';
import { Product } from '../../types';
import Input from '../Input/Input';
import Checkbox from '../CheckBox/CheckBox';
import ICONS from '../../constants/icons';

type Props = {
  product: Product;
  quantity: number;
  checked: boolean;
  onChangeQuantity: React.ChangeEventHandler<HTMLInputElement>;
  onCheck: React.ChangeEventHandler<HTMLInputElement>;
  onClickRemove: React.MouseEventHandler<HTMLButtonElement>;
};

function CartItem({
  product,
  quantity,
  checked,
  onChangeQuantity,
  onCheck,
  onClickRemove,
}: Props) {
  return (
    <StyledCartItemContainer>
      <StyledCartItemInformation>
        <Checkbox checked={checked} onChange={onCheck} />
        <StyledImageContainer>
          <img src={product.image} alt={product.name} />
        </StyledImageContainer>
        <p>{product.name}</p>
      </StyledCartItemInformation>
      <StyledCartItemControl>
        <StyledButton onClick={onClickRemove}>{ICONS.REMOVE}</StyledButton>
        <Input
          type="number"
          min="1"
          max="200"
          step="1"
          onChange={onChangeQuantity}
          value={quantity}
        />
        <p style={{ alignSelf: 'flex-end' }}>
          {(product.price * quantity).toLocaleString('ko-KR')}원
        </p>
      </StyledCartItemControl>
    </StyledCartItemContainer>
  );
}

const StyledCartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledCartItemInformation = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledImageContainer = styled.div`
  aspect-ratio: 1 / 1;
  overflow: hidden;
  min-width: 144px;
  height: 144px;

  img {
    width: 100%;
  }
`;

const StyledCartItemControl = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  width: fit-content;
  align-self: flex-end;
`;

export default CartItem;
