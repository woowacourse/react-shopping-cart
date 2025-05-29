import * as S from './CountButton.styles';

interface CountButtonProps {
  updateCartItem: (cartId: number) => void;
  quantity: number;
  cartId: number;
  increaseCartItem: (cartId: number, quantity: number) => void;
}

const CountButton = ({
  updateCartItem,
  quantity,
  cartId,
  increaseCartItem,
}: CountButtonProps) => {
  return (
    <div css={S.countButtonContainer}>
      <button
        css={S.countButtonButtonStyle}
        onClick={() => updateCartItem(cartId)}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        css={S.countButtonButtonStyle}
        onClick={() => increaseCartItem(cartId, quantity + 1)}
      >
        +
      </button>
    </div>
  );
};

export default CountButton;
