import styled from 'styled-components';
import { ReactComponent as MiniCartIcon } from 'assets/mini-cart-icon.svg';
import useCartQuantityStepper from './hooks/useCartQuantityStepper';

type CartQuantityStepperProps = {
  quantity: number;
  initialIncrement: () => void;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
};

const CartQuantityStepper = ({
  quantity,
  initialIncrement,
  increaseQuantity,
  decreaseQuantity,
}: CartQuantityStepperProps) => {
  const { isOpen, openStepper, closeStepper } = useCartQuantityStepper();
  const isPositiveQuantity = quantity > 0;

  const handleInitialIncrement = () => {
    openStepper();
    initialIncrement();
  };

  const handleDecreaseQuantity = () => {
    if (quantity === 1) closeStepper();

    decreaseQuantity();
  };

  const handleCloseStepperOnBlur = (e: React.FocusEvent) => {
    if (e.relatedTarget === e.currentTarget || e.currentTarget.contains(e.relatedTarget)) return;

    closeStepper();
  };

  return (
    <>
      {isOpen ? (
        <Stepper tabIndex={0} onBlur={handleCloseStepperOnBlur}>
          <DecreaseButton onClick={handleDecreaseQuantity}>-</DecreaseButton>
          <Quantity tabIndex={0}>{quantity}</Quantity>
          <IncreaseButton onClick={increaseQuantity} autoFocus>
            +
          </IncreaseButton>
        </Stepper>
      ) : isPositiveQuantity ? (
        <ClosedStepper onClick={openStepper}>
          <Quantity>{quantity}</Quantity>
        </ClosedStepper>
      ) : (
        <ClosedStepper onClick={handleInitialIncrement}>
          <MiniCartIcon />
        </ClosedStepper>
      )}
    </>
  );
};

export default CartQuantityStepper;

const ClosedStepper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background-color: #2ac1bc;
  cursor: pointer;
`;

const Stepper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 36px;
  padding: 5px;
  border: none;
  border-radius: 9999px;
  background-color: #2ac1bc;
`;

const DecreaseButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background-color: #2ac1bc;
  color: #ffffff;
  font-size: 26px;
  line-height: 20px;

  :hover {
    filter: brightness(0.9);
  }
`;

const Quantity = styled.span`
  margin: 0 auto;
  font-size: 16px;
`;

const IncreaseButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background-color: #2ac1bc;
  color: #ffffff;
  font-size: 26px;
  line-height: 20px;

  :hover {
    filter: brightness(0.9);
  }
`;
