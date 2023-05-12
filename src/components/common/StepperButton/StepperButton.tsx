import { ChangeEvent, useCallback } from 'react';

import { AddIcon, MinusIcon } from '../../../assets';
import { DEFAULT_MAX_COUNT, DEFAULT_MIN_COUNT, DEFAULT_STEP } from '../../../constants';
import * as S from './StepperButton.styles';

interface StepperButtonProps {
  count: number;
  minCount?: number;
  maxCount?: number;
  step?: number;
  handleDecreaseCount: (step: number) => void;
  handleIncreaseCount: (step: number) => void;
  handleCountChange: (input: string, minCount: number, maxCount: number) => void;
}

const StepperButton = ({
  count,
  minCount = DEFAULT_MIN_COUNT,
  maxCount = DEFAULT_MAX_COUNT,
  step = DEFAULT_STEP,
  handleDecreaseCount,
  handleIncreaseCount,
  handleCountChange,
}: StepperButtonProps) => {
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      handleCountChange(event.target.value, minCount, maxCount);
    },
    [handleCountChange, minCount, maxCount]
  );

  return (
    <S.StepperContainer>
      <S.StepperButton
        type="button"
        aria-label="decrease"
        disabled={count === minCount}
        variant="textButton"
        size="small"
        onClick={() => handleDecreaseCount(step)}
      >
        <MinusIcon />
      </S.StepperButton>
      <S.StepperInput
        name="count"
        value={count}
        aria-label="count input"
        onChange={onChange}
      ></S.StepperInput>
      <S.StepperButton
        type="button"
        aria-label="increase"
        disabled={count === maxCount}
        variant="textButton"
        size="small"
        onClick={() => handleIncreaseCount(step)}
      >
        <AddIcon />
      </S.StepperButton>
    </S.StepperContainer>
  );
};

export default StepperButton;
