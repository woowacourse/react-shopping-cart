import React from 'react';
import styled from 'styled-components';
import { Product } from '../../types';
import Input from '../Input/Input';
import Checkbox from '../CheckBox/CheckBox';

type Props = {
  product: Product;
  quantity: string;
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
      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.6rem' }}>
        <Checkbox checked={checked} onChange={onCheck} />
        <StyledImageContainer>
          <img src={product.image} alt={product.name} />
        </StyledImageContainer>
        <p>{product.name}</p>
      </div>
      <StyledCartItemInformation>
        <button onClick={onClickRemove}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5rem"
            height="1.5rem"
            style={{ alignSelf: 'flex-end' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="#DDDDDD"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
        <Input
          type="number"
          min="1"
          max="200"
          step="1"
          onChange={onChangeQuantity}
          value={quantity}
        />
        <p style={{ alignSelf: 'flex-end' }}>
          {product.price.toLocaleString('ko-KR')}원
        </p>
      </StyledCartItemInformation>
    </StyledCartItemContainer>
  );
}

const StyledCartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledImageContainer = styled.div`
  aspect-ratio: 1 / 1;
  overflow: hidden;
  width: 144px;
  height: 144px;

  img {
    width: 100%;
  }
`;

const StyledCartItemInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default CartItem;
