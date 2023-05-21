import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import { CSSProp, styled } from 'styled-components';
import { useSetCart } from '../../hooks/useCart';
import { useLoadCart } from '../../hooks/useLoadCart';
import { QuantityInputStyle, QuantityStyle } from '../main/QuantityInput';

interface Props {
  productId: number;
}

const QuantityButton = ({ productId }: Props) => {
  const { quantity, setQuantity } = useLoadCart(productId);
  const { addToCart } = useSetCart(productId);

  const handleQuantityStepUp = () => {
    if (quantity === 99) return;

    setQuantity(quantity + 1);
    addToCart(String(quantity + 1));
  };

  const handleQuantityStepDown = () => {
    if (quantity === 1) return;

    setQuantity(quantity - 1);
    addToCart(String(quantity - 1));
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
      cursor: ${(props) => props.quantity === 99 && 'default'};

      & > svg {
        fill: ${(props) => props.quantity === 99 && 'var(--gray-color-100)'};
      }
    }

    &:last-child {
      top: 16px;
      cursor: ${(props) => props.quantity === 1 && 'default'};

      & > svg {
        fill: ${(props) => props.quantity === 1 && 'var(--gray-color-100)'};
      }
    }
  `,
};

export default QuantityButton;
