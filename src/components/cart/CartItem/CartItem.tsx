import { styled } from 'styled-components';
import type { CartProduct } from '../../../types/product';
import CheckBox from '../../common/CheckBox/CheckBox';
import Image from '../../common/Image/Image';
import TrashCanIcon from '../../../assets/icons/TrashCanIcon';
import Counter from '../../common/Counter/Counter';
import { useState } from 'react';
import { formatPrice } from '../../../utils/formatPrice';

interface CartItemProps {
  cartItem: CartProduct;
  updateCheckedCartList: (id: number) => void;
}

const CartItem = ({ cartItem, updateCheckedCartList }: CartItemProps) => {
  const { id, imageSrc, name, price } = cartItem.product;

  const [count, setCount] = useState(cartItem.quantity);

  return (
    <CartItemContainer>
      <ItemContents>
        <CheckBox />
        <Image src={imageSrc} size="medium" />
        <Name>{name}</Name>
      </ItemContents>
      <ItemControllers>
        <TrashCanIcon />
        <Counter count={count} updateCount={setCount} />
        <Price>{formatPrice(price)}</Price>
      </ItemControllers>
    </CartItemContainer>
  );
};

const CartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 735px;
  height: 200px;

  padding: 25px 0;
`;

const ItemContents = styled.div`
  display: flex;
  gap: 15px;
`;

const Name = styled.div`
  font-weight: 400;
  font-size: 20px;
  color: #333;
`;

const ItemControllers = styled.div`
  display: flex;
  flex-direction: column;

  align-items: end;
  justify-content: space-between;
`;

const Price = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #333;
`;

export default CartItem;
