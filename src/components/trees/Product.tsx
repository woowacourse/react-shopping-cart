import type { ProductType } from '../../types';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CounterInput from '../leafs/CounterInput';

import useCart from '../../hooks/useCart';
import { MAX_QUANTITY } from '../../constants';

interface ProductProps extends ProductType {}

export default function Product(props: ProductProps) {
  const { id, name, price, imageUrl } = props;
  const [cart, { addCartItem, removeCartItem, updateQuantity }] = useCart();
  const [quantityInput, setQuantityInput] = useState('');
  const cartItem = cart.find((item) => item.product.id === id);

  const onAddCartItem = () => {
    const newCartItem = { id: Date.now(), quantity: 1, product: props };
    addCartItem(newCartItem);
    setQuantityInput('1');
  };

  useEffect(() => {
    if (quantityInput === '') return;

    const quantity = Number(quantityInput);
    if (quantity === 0) {
      removeCartItem(id);
    } else {
      updateQuantity(id, quantity);
    }
  }, [quantityInput]);

  useEffect(() => {
    if (cartItem) setQuantityInput(String(cartItem.quantity));
  }, []);

  return (
    <Wrapper>
      <Img src={imageUrl} />
      <InfoBox>
        <LabelBox>
          <Name>{name}</Name>
          <Price>{price.toLocaleString()} 원</Price>
        </LabelBox>
        <ControlBox>
          {cartItem ? (
            <CounterInput count={quantityInput} setCount={setQuantityInput} max={MAX_QUANTITY} />
          ) : (
            <CartIcon src="./cart.svg" onClick={onAddCartItem}></CartIcon>
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

const Img = styled.img`
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

const CartIcon = styled.img`
  width: 26px;
  height: 24px;
  margin-right: 10px;

  cursor: pointer;
`;

const ControlBox = styled.div`
  width: auto;
`;
