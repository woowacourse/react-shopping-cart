import * as Styled from './StepperInput.styles.tsx';

type StepperInputProps = {
  width?: number;
  height?: number;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const StepperInput = ({ width = 65, height = 28, value, onChange }: StepperInputProps) => {
  return <Styled.StepperInputContainer type='number' step='1' min='0' max='99' width={width} height={height} value={value} onChange={onChange} />;
};

export default StepperInput;
