import { ChangeEvent, ComponentPropsWithoutRef, useCallback } from 'react';

import { AddIcon, MinusIcon } from '../../../assets';
import { DEFAULT_MAX_COUNT, DEFAULT_MIN_COUNT } from '../../../constants';
import { isNumber } from '../../../utils/validator';
import * as S from './StepperButton.styles';

interface StepperButtonProps extends ComponentPropsWithoutRef<'div'> {
  count: number;
  minCount?: number;
  maxCount?: number;
  step?: number;
  handleDecreaseCount: () => void;
  handleIncreaseCount: () => void;
  handleCountChange: (count: number) => void;
}

const StepperButton = ({
  count,
  minCount = DEFAULT_MIN_COUNT,
  maxCount = DEFAULT_MAX_COUNT,
  handleDecreaseCount,
  handleIncreaseCount,
  handleCountChange,
  ...attributes
}: StepperButtonProps) => {
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!isNumber(event.target.value)) return;

      const currCount = Number(event.target.value);

      if (currCount < minCount || currCount > maxCount) return;

      handleCountChange(currCount);
    },
    [handleCountChange, minCount, maxCount]
  );

  return (
    <S.StepperContainer {...attributes}>
      <S.StepperButton
        type="button"
        aria-label="카운트 감소"
        disabled={count === minCount}
        variant="textButton"
        size="small"
        onClick={handleDecreaseCount}
      >
        <MinusIcon />
      </S.StepperButton>
      <S.StepperInput
        name="count"
        value={count}
        aria-label="카운트 입력"
        onChange={onChange}
      ></S.StepperInput>
      <S.StepperButton
        type="button"
        aria-label="카운트 증가"
        disabled={count === maxCount}
        variant="textButton"
        size="small"
        onClick={handleIncreaseCount}
      >
        <AddIcon />
      </S.StepperButton>
    </S.StepperContainer>
  );
};

export default StepperButton;
