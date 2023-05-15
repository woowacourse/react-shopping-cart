import { useCartCountState } from './hooks/useCartCountState';
import { CartCountProps } from '../types/CartCountType';
import { DecreaseButtonImage, IncreaseButtonImage } from '../types/image';
import * as Styled from './styles/CartCount.styles';
import { memo } from 'react';

export const CartCount = memo(({ id, onDeleteCart }: CartCountProps) => {
  const { increaseCount, decreaseCount, quantity } = useCartCountState({
    id,
    onDeleteCart,
  });

  return (
    <Styled.Wrapper>
      <Styled.QuantityText>{quantity}</Styled.QuantityText>
      <div>
        <Styled.IncreaseCountButton
          data-testid="increase-button"
          onClick={increaseCount}
        >
          <IncreaseButtonImage />
        </Styled.IncreaseCountButton>
        <Styled.DecreaseCountButton
          data-testid="decrease-button"
          onClick={decreaseCount}
        >
          <DecreaseButtonImage />
        </Styled.DecreaseCountButton>
      </div>
    </Styled.Wrapper>
  );
});
