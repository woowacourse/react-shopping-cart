import { useCartCountState } from './hooks/useCartCountState';
import { AddToCartCountProps } from '../types/addToCartCountType';
import { DecreaseButtonImage, IncreaseButtonImage } from '../types/image';
import styled from 'styled-components';

export const AddToCartCount = ({ id, quantity }: AddToCartCountProps) => {
  const { increaseCount, decreaseCount } = useCartCountState(id);

  return (
    <Wrapper>
      <CountValue>{quantity}</CountValue>
      <div>
        <IncreaseCountButton
          data-testid="increase-button"
          onClick={increaseCount}
        >
          <IncreaseButtonImage />
        </IncreaseCountButton>
        <DecreaseCountButton
          data-testid="decrease-button"
          onClick={decreaseCount}
        >
          <DecreaseButtonImage />
        </DecreaseCountButton>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 80px;
  border: 1px solid var(--border-color);
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
  border-left: 1px solid var(--border-color);
`;

const IncreaseCountButton = styled(DecreaseCountButton)`
  border-bottom: 1px solid var(--border-color);
`;
