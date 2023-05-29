import { forwardRef, MouseEvent } from 'react';
import useCounter, {
  UseCounterOptions,
} from '../../../hooks/common/useCounter';
import { composeEventHandlers } from '../../../utils/composeEventHandlers';
import Button from '../Button/Button';
import Flex from '../Flex';
import * as S from './QuantityStepper.styles';

interface QuantityStepperProps extends UseCounterOptions {
  onIncrease?(e: MouseEvent<HTMLButtonElement>): void;
  onDecrease?(e: MouseEvent<HTMLButtonElement>): void;
}

const QuantityStepper = forwardRef<HTMLInputElement, QuantityStepperProps>(
  (
    {
      init = 1,
      max = Infinity,
      min = -Infinity,
      onIncrease,
      onDecrease,
    }: QuantityStepperProps,
    ref
  ) => {
    const [quantity, increase, decrease] = useCounter({
      max,
      min,
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
