import styled from '@emotion/styled';
import { useState } from 'react';
import { Text } from '../common/Text/Text';
import { TrashCanIcon } from '../../assets';
import InputStepper from '../common/InputStepper/InputStepper';
import { CheckBox } from '../list/CartList';

const CartItem = () => {
  const [quantity, setQuantity] = useState(0);

  const handleSetQuantityOnInputStepper = (value: number) => {
    setQuantity(value);
  };

  return (
    <CartItemWrapper>
      <CheckBox type="checkbox" />
      <CartItemImage />
      <Text size="smallest" weight="light" color="#333333">
        [든든] 야채바삭 김말이 700g
      </Text>
      <CartItemControllerWrapper>
        <TrashCanIcon width={24} height={24} cursor="pointer" />
        <InputStepper
          size="big"
          quantity={quantity}
          setQuantity={handleSetQuantityOnInputStepper}
        />
        <Text size="minimum" weight="light" color="#333333">
          8,000원
        </Text>
      </CartItemControllerWrapper>
    </CartItemWrapper>
  );
};

export default CartItem;

const CartItemWrapper = styled.div`
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
