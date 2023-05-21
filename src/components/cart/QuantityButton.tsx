import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import { CSSProp, styled } from 'styled-components';
import { QUANTITY } from '../../constants';
import { useSetCart } from '../../hooks/useCart';
import { useLoadCart } from '../../hooks/useLoadCart';
import { QuantityInputStyle, QuantityStyle } from '../main/QuantityInput';

const { MAX, MIN, STEP } = QUANTITY;

interface Props {
  productId: number;
}

const QuantityButton = ({ productId }: Props) => {
  const { quantity, setQuantity } = useLoadCart(productId);
  const { addToCart } = useSetCart(productId);

  const handleQuantityStepUp = () => {
    if (quantity === MAX) return;

    setQuantity(quantity + STEP);
    addToCart(String(quantity + STEP));
  };

  const handleQuantityStepDown = () => {
    if (quantity === MIN) return;

    setQuantity(quantity - STEP);
    addToCart(String(quantity - STEP));
  };

  return (
    <QuantityStyle.Wrapper>
      <S.Quantity css={QuantityInputStyle}>{quantity}</S.Quantity>
      <S.Button
        quantity={quantity}
        onClick={handleQuantityStepUp}
        aria-label="button-to-raise-quantity"
      >
        <FaCaretUp />
      </S.Button>
      <S.Button
        quantity={quantity}
        onClick={handleQuantityStepDown}
        aria-label="button-to-lower-quantity"
      >
        <FaCaretDown />
      </S.Button>
    </QuantityStyle.Wrapper>
  );
};

const S = {
  Quantity: styled.span<{ css: CSSProp }>`
    ${(props) => props.css}

    line-height: 32px;
    padding-right: 24px;
    cursor: default;
  `,

  Button: styled.button<{ quantity: number }>`
    position: absolute;
    right: 0;
    z-index: 3;
    width: 26px;
    max-width: 26px;
    border: 0;
    font-size: 16px;
    cursor: pointer;

    &:nth-child(2) {
      cursor: ${(props) => props.quantity === MAX && 'default'};

      & > svg {
        fill: ${(props) => props.quantity === MAX && 'var(--gray-color-100)'};
      }
    }

    &:last-child {
      top: 16px;
      cursor: ${(props) => props.quantity === MIN && 'default'};

      & > svg {
        fill: ${(props) => props.quantity === MIN && 'var(--gray-color-100)'};
      }
    }
  `,
};

export default QuantityButton;
