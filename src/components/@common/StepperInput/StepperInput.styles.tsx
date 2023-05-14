import styled from 'styled-components';

export const StepperInputWrapper = styled.div`
  display: flex;
`;

export const Input = styled.input`
  border: 1px solid #ddd;
  width: 42px;
  height: 28px;
  padding-left: 4px;
`;

export const StepperWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Stepper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-white);
  border: 1px solid #ddd;
  width: 24px;
  height: 14px;
  font-size: 4px;
  cursor: pointer;
`;
