import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

type CheckBoxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const CheckBox = (props: CheckBoxProps) => {
  return <StyledCheckBox type='checkbox' {...props} />;
};

export default CheckBox;

const StyledCheckBox = styled.input`
  appearance: none;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 2px;
  width: 18px;
  height: 18px;
  cursor: pointer;

  :focus {
    outline: none;
  }

  :checked {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  :disabled {
    background-color: ${({ theme }) => theme.colors.GRAY_bbb};
  }

  :after {
    content: '✔';
    width: 100%;
    height: 100%;
    font-size: 0.75rem;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
