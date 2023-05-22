import type { ProductType } from '../../types';

import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import QuantityInput from '../common/QuantityInput';

import * as api from '../../api';
import { cartState } from '../../recoil/state';
import { API_ERROR_MESSAGE, MAX_QUANTITY } from '../../constants';

interface Props extends ProductType {}

export default function Product({ id, name, price, imageUrl }: Props) {
  const [cart, setCart] = useRecoilState(cartState);
  const [addLoading, setAddLoading] = useState(false);

  const cartItem = cart.find((cartItem) => cartItem.product.id === id);

  const addCartItem = async () => {
    setAddLoading(true);

    try {
      await api.postCartItem(id);
    } catch {
      alert(API_ERROR_MESSAGE.postCartItem);
      setAddLoading(false);
      return;
    }

    try {
      await api.getCart().then(setCart);
    } catch {
      alert(API_ERROR_MESSAGE.getCart);
    }

    setAddLoading(false);
  };

  return (
    <Wrapper>
      <Image src={imageUrl} />
      <InfoBox>
        <LabelBox>
          <Name>{name}</Name>
          <Price>{price.toLocaleString()} 원</Price>
        </LabelBox>
        <ControlBox>
          {cartItem ? (
            <QuantityInput cartItemId={cartItem.id} min={0} max={MAX_QUANTITY} />
          ) : (
            <CartItemAddButton onClick={addCartItem} disabled={addLoading}>
              <img src="./cart.svg" />
            </CartItemAddButton>
          )}
        </ControlBox>
      </InfoBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 282px;
  height: 362px;

  color: #333333;
`;

const Image = styled.img`
  width: 100%;
  height: 282px;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;

  width: 282px;

  padding-top: 18px;
  padding-left: 18px;
`;

const LabelBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled.p`
  margin-top: 4px;

  font-size: 16px;
  font-weight: 400;
`;

const Price = styled.p`
  margin-top: 10px;

  vertical-align: center;
  font-size: 20px;
  font-weight: 400;
`;

const CartItemAddButton = styled.button`
  width: 26px;
  height: 24px;
  margin-right: 10px;

  background: transparent;

  &:disabled {
    cursor: wait;
  }

  &:disabled > img {
    visibility: hidden;
  }
`;

const ControlBox = styled.div`
  width: auto;
`;
