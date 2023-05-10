import { useState } from 'react';
import styled from 'styled-components';
import { DecreaseButtonImage, IncreaseButtonImage } from '../types/image';
import { useRecoilState } from 'recoil';
import { addedCartState } from '../atoms/AddedCartState';
import { AddedProductList } from '../types/productType';

interface AddToCartCountProps {
  id: number;
  onDeleteCart: () => void;
}

export const AddToCartCount = ({ id, onDeleteCart }: AddToCartCountProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [addedCartStates, setAddedCartStates] = useRecoilState(addedCartState);

  const increaseCount = () => {
    setQuantity(quantity + 1);

    const addedCartList = addedCartStates.map((item: AddedProductList) => {
      if (item.id === id)
        return {
          ...item,
          quantity: item.quantity + 1,
        };

      return item;
    });
    setAddedCartStates(addedCartList);
  };

  const decreaseCount = () => {
    const addedCartList = addedCartStates.map((item: AddedProductList) => {
      if (item.id === id)
        return {
          ...item,
          quantity: item.quantity - 1,
        };

      return item;
    });
    setAddedCartStates(addedCartList);

    if (quantity === 1) {
      onDeleteCart();
    }

    setQuantity(quantity - 1);
  };

  return (
    <Wrapper>
      <CountValue>{quantity}</CountValue>
      <div>
        <IncreaseCountButton onClick={increaseCount}>
          <IncreaseButtonImage />
        </IncreaseCountButton>
        <DecreaseCountButton onClick={decreaseCount}>
          <DecreaseButtonImage />
        </DecreaseCountButton>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 80px;
  border: 1px solid #dddddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CountValue = styled.div`
  width: 68px;
  text-align: center;
`;

const DecreaseCountButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 15px;
  cursor: pointer;
  border-left: 1px solid #dddddd;
`;

const IncreaseCountButton = styled(DecreaseCountButton)`
  border-bottom: 1px solid #dddddd;
`;
