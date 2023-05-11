import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useCart from '../../hooks/useCart';
import { isNumeric } from '../../utils/validator';
import { MAX_QUANTITY } from '../../constants';

interface ProductProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

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
