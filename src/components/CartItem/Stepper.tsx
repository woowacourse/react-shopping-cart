import { css } from '@emotion/react';

interface StepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  disabled: boolean;
}

export default function Stepper({ value, onIncrement, onDecrement, disabled }: StepperProps) {
  return (
    <div css={stepperWrapper} data-testid="stepper">
      <button css={buttonCss} onClick={onDecrement} disabled={disabled}>
        -
      </button>
      <span css={valueCss}>{value}</span>
      <button css={buttonCss} onClick={onIncrement} disabled={disabled}>
        +
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

const buttonCss = css({
  backgroundColor: 'white',
  border: '1px solid #eaeaea',
  borderRadius: '4px',
  cursor: 'pointer',
  width: '24px',
  height: '24px',

  '&:hover': {
    backgroundColor: '#eaeaea'
  },

  '&:disabled': {
    backgroundColor: '#BEBEBE',
    cursor: 'not-allowed'
  }
});
