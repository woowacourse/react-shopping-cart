import styled from 'styled-components';
import { isNumeric } from '../../utils/validator';

interface Props {
  value: string;
  setValue: (value: string) => void;
  max?: number;
}

export default function CounterInput({ value, setValue, max }: Props) {
  const onChangeInput = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (value === '') {
      setValue('');
    } else if (max !== undefined && isNumeric(value)) {
      setValue(Math.min(Number(value), max).toString());
    } else if (isNumeric(value)) {
      setValue(value);
    }
  };

  const onBlurInput = () => {
    if (value === '') setValue('0');
  };

  const onCountUp = () => {
    setValue(String(Number(value) + 1));
  };

  const onCountDown = () => {
    setValue(String(Number(value) - 1));
  };

  return (
    <Wrapper>
      <Input type="text" value={value} onChange={onChangeInput} onBlur={onBlurInput} />
      <CounterBox>
        <Counter onClick={onCountUp}>
          <img src="./arrowUp.svg" />
        </Counter>
        <Counter onClick={onCountDown}>
          <img src="./arrowDown.svg" />
        </Counter>
      </CounterBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;

  width: 64px;
  height: 28px;

  text-align: center;
`;

const Input = styled.input`
  width: 64%;
  height: 100%;
  border: 1px solid #dddddd;

  text-align: center;
`;

const CounterBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 36%;
  height: 100%;
`;

const Counter = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 50%;
  border: 1px solid #dddddd;
  background: transparent;

  cursor: pointer;

  & > img {
    width: 48%;
    height: 32%;
    color: #333333;
  }
`;
