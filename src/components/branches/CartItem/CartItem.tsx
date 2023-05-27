import type { CartItemType } from '../../../types';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Counter, DeleteIcon, CheckBox } from '../../../components';
import useCart from '../../../hooks/useCart';
import { isNumeric } from '../../../utils/validator';
import { MAX_QUANTITY } from '../../../constants';

type CartItemProps = CartItemType;

export default function CartItem({ id, quantity, product }: CartItemProps) {
  const { name, price, imageUrl } = product;
  const { removeCartItem, updateQuantity } = useCart();

  const [quantityInput, setQuantityInput] = useState(String(quantity));

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
      removeCartItem(product.id);
    } else {
      updateQuantity(product.id, quantity);
    }
  }, [quantityInput]);

  return (
    <S.Wrapper>
      <S.LeftBox>
        <CheckBox id={String(product.id)} />
        <S.Img src={imageUrl} />
        <S.Name>{name}</S.Name>
      </S.LeftBox>
      <S.RightBox>
        <DeleteIcon cartItemId={product.id} handleClick={removeCartItem} />
        <Counter
          type="number"
          value={quantityInput}
          onChange={handleChangeCounter}
          onBlur={handleBlurCounter}
          counterSize="large"
        />
        <S.Price>{price.toLocaleString()}원</S.Price>
      </S.RightBox>
    </S.Wrapper>
  );
}

const Wrapper = styled.div`
  width: 700px;
  display: flex;
  justify-content: space-between;

  border-bottom: 1px solid #cccccc;
  color: ${(props) => props.theme.color.black};

  @media screen and (max-width: 1025px) {
    width: 400px;
  }

  @media screen and (max-width: 767px) {
    width: 320px;
  }
`;

const LeftBox = styled.div`
  display: flex;
  justify-content: start;
  gap: 24px;

  @media screen and (max-width: 767px) {
    gap: 10px;
  }
`;

const Img = styled.img`
  width: 200px;
  height: 200px;

  margin-bottom: 30px;

  @media screen and (max-width: 767px) {
    width: 100px;
    height: 100px;
  }
`;

const Name = styled.p`
  font-size: 18px;
  font-weight: 400;

  margin-top: 4px;

  @media screen and (max-width: 767px) {
    font-size: 12px;
  }
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: 400;

  @media screen and (max-width: 767px) {
    font-size: 15px;
    margin-bottom: 20px;
  }
`;

const RightBox = styled.div`
  width: 120px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 40px;

  align-items: end;

  @media screen and (max-width: 767px) {
    gap: 20px;
  }
`;

const S = {
  Wrapper,
  LeftBox,
  Img,
  Name,
  Price,
  RightBox,
};
