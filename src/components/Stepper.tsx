import { css } from '@emotion/react';

interface StepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function Stepper({ value, onIncrement, onDecrement }: StepperProps) {
  return (
    <div css={stepperWrapper}>
      <button onClick={onDecrement}>
        <img src="assets/minus.svg" />
      </button>
      <span css={valueCss}>{value}</span>
      <button onClick={onIncrement}>
        <img src="assets/plus.svg" />
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
