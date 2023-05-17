import styled from '@emotion/styled';
import { useState } from 'react';
import { Text } from '../common/Text/Text';
import { TrashCanIcon } from '../../assets';
import InputStepper from '../common/InputStepper/InputStepper';
import { CheckBox } from '../list/CartList';
import type { CartItem } from '../../types/types';

const CartListItem = ({ cartItem }: { cartItem: CartItem }) => {
  const [quantity, setQuantity] = useState(0);

  const handleSetQuantityOnInputStepper = (value: number) => {
    setQuantity(value);
  };

  return (
    <CartListItemWrapper>
      <CheckBox type="checkbox" />
      <CartItemImage src={cartItem.product.imageUrl}/>
      <Text size="smallest" weight="light" color="#333333">
        {cartItem.product.name}
      </Text>
      <CartItemControllerWrapper>
        <TrashCanIcon width={24} height={24} cursor="pointer" />
        <InputStepper
          size="big"
          quantity={cartItem.quantity}
          setQuantity={handleSetQuantityOnInputStepper}
        />
        <Text size="minimum" weight="light" color="#333333">
          {cartItem.product.price}원
        </Text>
      </CartItemControllerWrapper>
    </CartListItemWrapper>
  );
};

export default CartListItem;

const CartListItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  height: 203px;
  padding: 20px 10px;
  border-top: 1px solid #cccccc;
`;

const CartItemImage = styled.img`
  width: 144px;
  height: 147px;
`;

const CartItemControllerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  width: 144px;
  height: 147px;
`;
