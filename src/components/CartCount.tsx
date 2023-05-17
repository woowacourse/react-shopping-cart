import { CartCountProps } from '../types/CartCountType';
import { DecreaseButtonImage, IncreaseButtonImage } from '../types/image';
import * as Styled from './styles/CartCount.styles';
import { memo } from 'react';

export const CartCount = memo(
  ({
    quantity,
    handleDeleteCart,
    increaseProductCount,
    decreaseProductCount,
  }: CartCountProps) => {
    const increaseCount = () => {
      increaseProductCount();
    };

    const decreaseCount = () => {
      if (quantity === 1) {
        handleDeleteCart();
        return;
      }

      decreaseProductCount();
    };

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
  }
);
