import styled from 'styled-components';
import { DecreaseButtonImage, IncreaseButtonImage } from '../types/image';
import { useCartCountState } from './hooks/useCartCountState';
import { AddToCartCountProps } from '../types/addToCartCountType';

export const AddToCartCount = ({ id, onDeleteCart }: AddToCartCountProps) => {
  const { increaseCount, decreaseCount, quantity } = useCartCountState({
    id,
    onDeleteCart,
  });

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
