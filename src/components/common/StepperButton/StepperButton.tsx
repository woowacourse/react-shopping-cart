import { ChangeEvent, useCallback } from 'react';

import { AddIcon, MinusIcon } from '../../../assets';
import { STEPPER_BUTTON_MAX_COUNT, STEPPER_BUTTON_MIN_COUNT } from '../../../constants';
import * as S from './StepperButton.styles';

interface StepperButtonProps {
  count: number;
  minCount?: number;
  maxCount?: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const StepperButton = ({
  count,
  minCount = STEPPER_BUTTON_MIN_COUNT,
  maxCount = STEPPER_BUTTON_MAX_COUNT,
  setCount,
}: StepperButtonProps) => {
  const handleDecrease = useCallback(() => {
    setCount((prevCount) => prevCount - 1);
  }, [setCount]);

  const handleIncrease = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, [setCount]);

  const handleCountChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (Number(event.target.value) < minCount || Number(event.target.value) > maxCount) return;

      setCount(Number(event.target.value));
    },
    [maxCount, minCount, setCount]
  );

  return (
    <S.StepperContainer>
      <S.StepperButton
        type="button"
        aria-label="decrease"
        disabled={count === minCount}
        variant="textButton"
        size="small"
        onClick={handleDecrease}
      >
        <MinusIcon />
      </S.StepperButton>
      <S.StepperInput
        name="count"
        value={count}
        aria-label="count input"
        onChange={handleCountChange}
      ></S.StepperInput>
      <S.StepperButton
        type="button"
        aria-label="increase"
        disabled={count === maxCount}
        variant="textButton"
        size="small"
        onClick={handleIncrease}
      >
        <AddIcon />
      </S.StepperButton>
    </S.StepperContainer>
  );
};

export default StepperButton;
