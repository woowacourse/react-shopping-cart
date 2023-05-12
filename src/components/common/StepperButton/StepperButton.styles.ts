import styled from 'styled-components';

import { Button } from '../Button/Button.styles';

const StepperContainer = styled.div`
  width: fit-content;
  border: 1px solid ${({ theme }) => theme.color.gray3};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
`;

const StepperButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    outline: 0;
    box-shadow: none;
  }

  &:disabled > svg > path {
    stroke: ${({ theme }) => theme.color.gray4};
  }
`;

const StepperInput = styled.input`
  width: 40px;
  height: 24px;
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  border: none;
  outline: none;
`;

export { StepperContainer, StepperButton, StepperInput };
