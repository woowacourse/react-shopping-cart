import { BsPlus, BsDash } from 'react-icons/bs';
import { styled } from 'styled-components';
import { QUANTITY, STEP_HANDLER } from '../../constants';
import { useSetCart } from '../../hooks/useCart';
import { useLoadCart } from '../../hooks/useLoadCart';

const { MAX, MIN, STEP } = QUANTITY;
const { UP, DOWN } = STEP_HANDLER;

interface Props {
  productId: number;
  quantity: number;
}

const QuantityButton = ({ productId, quantity }: Props) => {
  const { setQuantity } = useLoadCart(productId);
  const { updateCart } = useSetCart(productId);

  const handleQuantityChange = (quantityLimit: number, handler: keyof typeof STEP_HANDLER) => {
    if (quantity === quantityLimit) return;

    const updatedQuantity = handler === UP ? quantity + STEP : quantity - STEP;

    setQuantity(updatedQuantity);
    updateCart(String(updatedQuantity));
  };

  return (
    <S.Wrapper>
      <S.Button
        quantity={quantity}
        onClick={() => handleQuantityChange(MIN, DOWN)}
        aria-label="button-to-lower-quantity"
      >
        <BsDash />
      </S.Button>
      <S.Quantity>{quantity}</S.Quantity>
      <S.Button
        quantity={quantity}
        onClick={() => handleQuantityChange(MAX, UP)}
        aria-label="button-to-raise-quantity"
      >
        <BsPlus />
      </S.Button>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    margin: -8px 0 12px;

    @media (max-width: 548px) {
      margin-bottom: 6px;
    }
  `,

  Quantity: styled.span`
    display: block;
    width: 34px;
    border-top: 1px solid var(--gray-color-200);
    border-bottom: 1px solid var(--gray-color-200);
    text-align: center;
    font-size: 14px;
    line-height: 30px;
    cursor: default;

    @media (max-width: 548px) {
      font-size: 13px;
    }
  `,

  Button: styled.button<{ quantity: number }>`
    width: 26px;
    max-width: 26px;
    border: 1px solid var(--gray-color-200);
    font-size: 16px;
    background: none;
    cursor: pointer;

    &[aria-label='button-to-raise-quantity'] {
      border-left: 0;
      cursor: ${(props) => props.quantity === MAX && 'default'};

      & > svg {
        fill: ${(props) => props.quantity === MAX && 'var(--gray-color-100)'};
      }
    }

    &[aria-label='button-to-lower-quantity'] {
      border-right: 0;
      cursor: ${(props) => props.quantity === MIN && 'default'};

      & > svg {
        fill: ${(props) => props.quantity === MIN && 'var(--gray-color-100)'};
      }
    }
  `,
};

export default QuantityButton;
