import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BasicButton, Flex } from './basics';

function NumberInput({ count }) {
  const [value, setValue] = useState(count);
  const [isMin, setIsMin] = useState(count === 1);

  const handleChangeInput = (e) => {
    if (e.target.value === 0) {
      return;
    }
    if (e.target.value < 0) {
      return;
    }
    setValue(Number(e.target.value));
  };
  const handleIncrement = () => {
    setValue((prev) => prev + 1);
  };
  const handleDecrement = () => {
    if (value <= 1) {
      return;
    }
    setValue((prev) => prev - 1);
  };

  useEffect(() => {
    setIsMin(value === 1);
  }, [value]);

  return (
    <Flex justify="center" align="center">
      <Style.NumberInput
        type="number"
        value={value}
        onChange={handleChangeInput}
      />
      <Style.NumberInputBox>
        <Style.NumberInputButton type="button" onClick={handleIncrement}>
          ▲
        </Style.NumberInputButton>
        <Style.NumberInputButton
          type="button"
          disabled={isMin}
          onClick={handleDecrement}
        >
          ▼
        </Style.NumberInputButton>
      </Style.NumberInputBox>
    </Flex>
  );
}

export default NumberInput;

NumberInput.defaultProps = {
  count: 1,
};

const Style = {
  NumberInput: styled.input`
    width: 72px;
    height: 58px;
    border: 1px solid #dddddd;
    text-align: center;
    font-size: 24px;

    &[type='number']::-webkit-outer-spin-button,
    &[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
  `,
  NumberInputBox: styled.div`
    height: 100%;
  `,
  NumberInputButton: styled(BasicButton)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 12px;
    border: 1px solid #dddddd;
    font-size: 8px;
    height: 50%;
    cursor: pointer;
  `,
};
