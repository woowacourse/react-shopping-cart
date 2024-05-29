import {
  countButton,
  countWrapper,
  loadingSpinner,
  loadingWrapper,
} from './CountButtonContainer.styled';

import { CartItemProps } from '@/types/cartItem';
import { MINUS, PLUS } from '@assets/images';

import useCounter from '@hooks/useCounter';

interface CountButtonContainerProps {
  item: CartItemProps;
}

const CountButtonContainer = ({ item }: CountButtonContainerProps) => {
  const { handleDecrementQuantity, handleIncrementQuantity, isLoading } = useCounter(item);

  return (
    <div css={countWrapper}>
      <button
        id="minus-button"
        css={countButton(item.quantity === 1)}
        onClick={handleDecrementQuantity}
        disabled={item.quantity === 1}
      >
        <img src={MINUS} alt={`${item.product.name}-minus`} />
      </button>
      {isLoading ? (
        <div css={loadingWrapper}>
          <span css={loadingSpinner}></span>
        </div>
      ) : (
        <span>{item.quantity}</span>
      )}
      <button css={countButton()} onClick={handleIncrementQuantity}>
        <img src={PLUS} alt={`${item.product.name}-plus`} />
      </button>
    </div>
  );
};

export default CountButtonContainer;
