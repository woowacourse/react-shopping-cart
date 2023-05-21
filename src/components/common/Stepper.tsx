import type { RuleSet } from 'styled-components';
import { css, styled } from 'styled-components';
import ArrowDown from '../../assets/icons/arrow-down.svg';
import ArrowUp from '../../assets/icons/arrow-up.svg';

type StepperVariant = 'small' | 'large';

const InputContainerStylesByVariant: Record<StepperVariant, RuleSet<object>> = {
  small: css({
    width: '70px',
    height: '26px',
    fontSize: '12px',
  }),
  large: css({
    width: '120px',
    height: '60px',
    fontSize: '24px',
  }),
};

type InputContainerProps = {
  $variant: StepperVariant;
};

const InputContainer = styled.div<InputContainerProps>`
  ${(props) => InputContainerStylesByVariant[props.$variant]}

  display: flex;
  align-items: stretch;
`;

const Input = styled.input`
  flex: 1;
  width: 100%;
  border: 1px solid #e5e5e5;
  text-align: center;
  font-size: 1em;

  outline: none;
`;

const InputButtonStylesByVariant: Record<StepperVariant, RuleSet<object>> = {
  small: css({
    width: '24px',
    '& > img': {
      width: '5px',
    },
  }),
  large: css({
    width: '48px',
    '& > img': {
      width: '8px',
    },
  }),
};

type InputButtonProps = {
  $variant: StepperVariant;
};

const InputButton = styled.button<InputButtonProps>`
  ${(props) => InputButtonStylesByVariant[props.$variant]}

  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  border: 1px solid #e5e5e5;
  cursor: pointer;
`;

type StepperProps = {
  variant?: StepperVariant;
  min?: number;
  max?: number;
  value: number;
  onChange?: (value: number) => void;
};

const Stepper = (props: StepperProps) => {
  const { variant = 'small', min, max, value, onChange } = props;

  const handleClick = (type: 'increase' | 'decrease') => () => {
    const newValue = value + (type === 'increase' ? 1 : -1);

    if (min !== undefined && newValue < min) return;
    if (max !== undefined && newValue > max) return;

    onChange?.(newValue);
  };

  return (
    <InputContainer $variant={variant}>
      <Input value={value} readOnly />
      <div>
        <InputButton $variant={variant} onClick={handleClick('increase')}>
          <img alt="증가" src={ArrowUp} />
        </InputButton>
        <InputButton $variant={variant} onClick={handleClick('decrease')}>
          <img alt="감소" src={ArrowDown} />
        </InputButton>
      </div>
    </InputContainer>
  );
};

export default Stepper;
