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
    const decreaseCount = () => {
      if (quantity === 1) {
        handleDeleteCart && handleDeleteCart();
        return;
      }

      decreaseProductCount();
    };

    return (
      <Styled.Wrapper>
        <Styled.QuantityText>{quantity}</Styled.QuantityText>
        <div>
          <Styled.IncreaseCountButton
            width="20px"
            height="20px"
            data-testid="increase-button"
            onClick={increaseProductCount}
          >
            <IncreaseButtonImage />
          </Styled.IncreaseCountButton>
          <Styled.DecreaseCountButton
            width="20px"
            height="20px"
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
