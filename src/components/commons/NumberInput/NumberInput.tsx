import * as Styled from './NumberInput.styles';
import triangleUpSVG from '../../../assets/svgs/triangle-up.svg';
import triangleDownSVG from '../../../assets/svgs/triangle-down.svg';
import { isPositiveNumber } from '../../../utils/validation';

export interface Props {
  initValue: number;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  maxLength?: number;
}

const NumberInput = ({ initValue = 1, maxLength = 2, value = '1', setValue }: Props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === '') {
      setValue && setValue('');
      return;
    }

    if (!isPositiveNumber(value)) {
      return;
    }

    setValue && setValue(value);
  };

  const onNumberIncrease = () => {
    setValue && setValue(String(Number(value) + 1));
  };

  const onNumberDecrease = () => {
    setValue && setValue(state => (isPositiveNumber(Number(state) - 1) ? String(Number(value) - 1) : state));
  };

  return (
    <Styled.NumberInput>
      <Styled.Input maxLength={maxLength} value={value} onChange={onChange} />
      <Styled.TriangleButtonWrapper>
        <Styled.TriangleButton onClick={onNumberIncrease}>
          <img src={triangleUpSVG} alt="수량 증가 버튼" />
        </Styled.TriangleButton>
        <Styled.TriangleButton onClick={onNumberDecrease}>
          <img src={triangleDownSVG} alt="수량 감소 버튼" />
        </Styled.TriangleButton>
      </Styled.TriangleButtonWrapper>
    </Styled.NumberInput>
  );
};

export default NumberInput;
