import styled from 'styled-components';

export const StepperInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 88px;
  flex: 1;
  padding: 13px;
`;

export const Button = styled.button`
  padding: 2px 10px;
  background-color: #e0e0e0;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #d0d0d0;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
