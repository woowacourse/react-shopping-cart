import * as Styled from './NumberInput.styles';
import triangleUpSVG from '../../../assets/svgs/triangle-up.svg';
import triangleDownSVG from '../../../assets/svgs/triangle-down.svg';
import { isPositiveNumber } from '../../../utils/validation';

export interface Props {
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>> | ((value: string) => void);
  maxNumber?: number;
}

const NumberInput = ({ maxNumber = 99, value = '1', setValue }: Props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!setValue) {
      return;
    }

    const { value } = event.target;
    if (value === '') {
      setValue('');
      return;
    }

    if (!isPositiveNumber(value) || Number(value) > maxNumber) {
      return;
    }

    setValue(String(value));
  };

  const onNumberIncrease = () => {
    setValue?.(String(Number(value) + 1));
  };

  const onNumberDecrease = () => {
    const newValue = isPositiveNumber(Number(value) - 1) ? String(Number(value) - 1) : value;
    setValue?.(newValue);
  };

  return (
    <Styled.NumberInput>
      <Styled.Input type="number" value={value} onChange={onChange} />
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
