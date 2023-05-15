import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useCart from '../../hooks/useCart';
import { isNumeric } from '../../utils/validator';
import { MAX_QUANTITY } from '../../constants';
import { ProductType } from '../../types';

type ProductProps = ProductType;

export default function Product(props: ProductProps) {
  const { id, name, price, imageUrl } = props;
  const [cart, addCartItem, removeCartItem, updateQuantity] = useCart();
  const [quantityInput, setQuantityInput] = useState('');
  const cartItem = cart.find((item) => item.product.id === id);

  const handleClickIcon = () => {
    const newCartItem = { id: Date.now(), quantity: 1, product: props };
    addCartItem(newCartItem);
    setQuantityInput('1');
  };

  const handleChangeCounter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setQuantityInput('');
    } else if (isNumeric(value)) {
      setQuantityInput(Number(value) > MAX_QUANTITY ? MAX_QUANTITY.toString() : value);
    }
  };

  const handleBlurCounter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') removeCartItem(id);
  };

  useEffect(() => {
    if (!isNumeric(quantityInput)) return;

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
            <Counter
              type="number"
              value={quantityInput}
              onChange={handleChangeCounter}
              onBlur={handleBlurCounter}
            />
          ) : (
            <CartIcon src="./cart.svg" onClick={handleClickIcon}></CartIcon>
          )}
        </ControlBox>
      </InfoBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 200px;
  height: 282px;

  color: ${(props) => props.theme.color.black};

  @media screen and (max-width: 767px) {
    width: 150px;
    height: 212px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 75%;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

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

  @media screen and (max-width: 767px) {
    font-size: 11px;
  }
`;

const Price = styled.p`
  margin-top: 10px;

  vertical-align: center;
  font-size: 20px;
  font-weight: 400;

  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
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

const Counter = styled.input`
  width: 64px;
  height: 28px;
  border: 1px solid #dddddd;
  border-radius: 0px;

  text-align: center;

  &::-webkit-inner-spin-button {
    opacity: 1;
    height: 28px;
  }
`;
