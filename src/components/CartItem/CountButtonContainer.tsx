import { css } from '@emotion/react';

import { CartItemProps } from '@/types/cartItem';
import { MINUS, PLUS } from '@assets/images';
import { THEME } from '@constants/theme';

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

const loadingWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const loadingSpinner = css`
  width: 16px;
  height: 16px;

  border: 2px solid #3498db;
  border-top: 2px solid transparent;
  border-radius: 50%;

  animation: rotate 1s linear infinite;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const countWrapper = css`
  width: 120px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const countButton = (isDisabled?: boolean) => css`
  width: 24px;
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${THEME.LIGHT_BLACK};
  border-radius: 8px;
  padding: 4px;

  background-color: ${THEME.WHITE};

  font-size: 24px;

  &:hover {
    opacity: ${isDisabled ? THEME.DISABLED_OPACITY : THEME.HOVER_OPACITY};
  }

  cursor: ${isDisabled ? 'auto' : 'pointer'};
  opacity: ${isDisabled ? THEME.DISABLED_OPACITY : 1};
`;
