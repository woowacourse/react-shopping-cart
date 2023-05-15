import { styled } from 'styled-components';
import { PRODUCT } from '../constants';
import { useStepper } from '../hooks/useStepper';
import Button from './common/Button';

interface Props {
  quantity?: number;
  updateQuantity: (quantity: number) => void;
}

export default function Stepper({ quantity = 0, updateQuantity }: Props) {
  const { handleInputChange, handleButtonClick } = useStepper({ quantity, updateQuantity });

  return (
    <Style.Container>
      <Button name="decrease" designType="square" onClick={handleButtonClick}>
        -
      </Button>
      <Style.CountInput value={quantity} onChange={handleInputChange} />
      <Button
        name="increase"
        designType="square"
        disabled={quantity === PRODUCT.MAX_COUNT}
        onClick={handleButtonClick}
      >
        +
      </Button>
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    display: flex;
    align-items: center;

    width: 70px;
    height: 30px;
    background-color: var(--grey-100);
    border: 1px solid var(--grey-200);
    border-radius: 7px;

    & > * {
      flex: 1;
    }
  `,

  CountInput: styled.input`
    border: none;
    width: 0;

    font-size: 12px;
    text-align: center;

    &:focus {
      outline: none;
    }
  `,
};
