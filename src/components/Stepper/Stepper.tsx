import { css } from '@emotion/react';

interface StepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function Stepper({ value, onIncrement, onDecrement }: StepperProps) {
  return (
    <div css={stepperWrapper} data-testid="stepper">
      <button onClick={onDecrement}>
        <img src="assets/minus.svg" alt="차감" />
      </button>
      <span css={valueCss}>{value}</span>
      <button onClick={onIncrement}>
        <img src="assets/plus.svg" alt="증가" />
      </button>
    </div>
  );
}

const stepperWrapper = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
});

const valueCss = css({
  fontSize: '12px',
  fontWeight: 500
});
