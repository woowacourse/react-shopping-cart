import React from 'react';
import styled from 'styled-components';

interface CheckBoxProps {
  checked: boolean;
  onClick: () => void;
}

const CheckBox = ({ checked, onClick }: CheckBoxProps) => {
  const handleChange = () => {
    onClick();
  };

  return <StyledCheckBox type='checkbox' checked={checked} onChange={handleChange} />;
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
