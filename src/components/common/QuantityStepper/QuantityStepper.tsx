import { forwardRef, MouseEvent } from 'react';
import useCounter from '../../../hooks/common/useCounter';
import { composeEventHandlers } from '../../../utils/composeEventHandlers';
import Button from '../Button/Button';
import Flex from '../Flex';
import * as S from './QuantityStepper.styles';

interface QuantityStepperProps {
  onIncrease?(e: MouseEvent<HTMLButtonElement>): void;
  onDecrease?(e: MouseEvent<HTMLButtonElement>): void;
  init?: number;
}

const QuantityStepper = forwardRef<HTMLInputElement, QuantityStepperProps>(
  ({ init = 1, onIncrease, onDecrease }: QuantityStepperProps, ref) => {
    const [quantity, increase, decrease] = useCounter({
      max: 100,
      min: 1,
      init,
    });

    return (
      <Flex>
        <Button
          size="S"
          view="white"
          onClick={composeEventHandlers(onDecrease, decrease)}>
          ▼
        </Button>
        <S.Quantity ref={ref} value={quantity} disabled />
        <Button
          size="S"
          view="white"
          onClick={composeEventHandlers(onIncrease, increase)}>
          ▲
        </Button>
      </Flex>
    );
  }
);

QuantityStepper.displayName = 'QuantityStepper';

export default QuantityStepper;
