import preventClickEvent from 'utils/event';
import styled from 'styled-components';

type Props = {
  min?: number;
  max?: number;
  value: number;
  setValue: (value: number) => void;
};

function NumberInput({ min = 1, max = 99, value, setValue }: Props) {
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);

    if (inputValue < min) {
      setValue(min);
      return;
    }
    if (inputValue > max) {
      setValue(max);
      return;
    }

    setValue(inputValue);
  };

  const onClickUpButton = () => {
    const newValue = value + 1;

    if (newValue > max) {
      setValue(max);
      return;
    }
    setValue(newValue);
  };

  const onClickDownButton = () => {
    const newValue = value - 1;

    if (newValue < min) {
      setValue(min);
      return;
    }
    setValue(newValue);
  };

  return (
    <StyledNumberInput onClick={preventClickEvent}>
      <Input
        type="number"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={onChangeValue}
      />
      <ControlButton>
        <button type="button" onClick={onClickUpButton}>
          ▲
        </button>
        <button type="button" onClick={onClickDownButton}>
          ▼
        </button>
      </ControlButton>
    </StyledNumberInput>
  );
}

const StyledNumberInput = styled.div`
  display: flex;
  position: relative;
  top: -90px;
  left: 20px;
  float: right;

  width: 90px;
  height: 40px;
  margin: 0;

  background: ${({ theme: { colors } }) => colors.white};
`;

const Input = styled.input`
  -moz-appearance: textfield;
  box-sizing: border-box;

  width: 70%;
  height: 100%;
  border: 1px solid ${({ theme: { colors } }) => colors.lightGray};
  padding: 10px;
  outline: none;

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ControlButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 30%;
  height: 100%;

  button {
    width: 100%;
    height: 50%;
    border: 1px solid ${({ theme: { colors } }) => colors.lightGray};

    background: none;
    color: ${({ theme: { colors } }) => colors.redPink};

    font-size: 8px;
  }
`;

export default NumberInput;
