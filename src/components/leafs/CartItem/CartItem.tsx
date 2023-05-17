import { useState } from 'react';
import styled from 'styled-components';
import { CartItemType } from '../../../types';
import CheckBox from '../CheckBox/CheckBox';
import DeleteIcon from '../DeleteIcon';
import Counter from '../Counter/Counter';
import useCart from '../../../hooks/useCart';
import { isNumeric } from '../../../utils/validator';
import { MAX_QUANTITY } from '../../../constants';

type CartItemProps = CartItemType;

export default function CartItem({ id, quantity, product }: CartItemProps) {
  const { name, price, imageUrl } = product;
  const [cart, addCartItem, removeCartItem, updateQuantity] = useCart();

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
  return (
    <Wrapper>
      <LeftBox>
        <CheckBox />
        <Img src={imageUrl} />
        <Name>{name}</Name>
      </LeftBox>
      <RightBox>
        <DeleteIcon />
        <Counter
          type="number"
          value={quantity}
          onChange={handleChangeCounter}
          onBlur={handleBlurCounter}
          counterSize="large"
        />
        <Price>{price}원</Price>
      </RightBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 700px;
  display: flex;
  justify-content: space-between;

  color: ${(props) => props.theme.color.black};

  @media screen and (max-width: 767px) {
    width: 300px;
  }
`;

const LeftBox = styled.div`
  display: flex;
  justify-content: start;
  gap: 24px;
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
`;

const Name = styled.p`
  font-size: 18px;
  font-weight: 400;

  margin-top: 4px;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: 400;
`;

const RightBox = styled.div`
  width: 120px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  align-items: end;
`;
