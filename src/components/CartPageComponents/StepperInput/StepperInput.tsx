import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

const StepperInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 88px;
  flex: 1;
  padding: 13px;
`;

const Button = styled.button`
  padding: 2px 10px;
  background-color: #e0e0e0;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #d0d0d0;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepperInput = () => {
  const [value, setValue] = useState('');

  const handleIncrement = () => {
    setValue((prevValue) => {
      const parsedValue = parseInt(prevValue);
      return isNaN(parsedValue) ? '1' : String(parsedValue + 1);
    });
  };

  const handleDecrement = () => {
    setValue((prevValue) => {
      const parsedValue = parseInt(prevValue);
      return isNaN(parsedValue) ? '1' : String(Math.max(parsedValue - 1, 1));
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setValue(inputValue.replace(/\D/, ''));
  };

  const handleInputBlur = () => {
    if (value === '') {
      setValue('1');
    }
  };

  return (
    <StepperInputWrapper>
      <Input type='text' value={value} onChange={handleInputChange} onBlur={handleInputBlur} />
      <ButtonWrapper>
        <Button onClick={handleIncrement}>+</Button>
        <Button onClick={handleDecrement}>-</Button>
      </ButtonWrapper>
    </StepperInputWrapper>
  );
};

export default StepperInput;
