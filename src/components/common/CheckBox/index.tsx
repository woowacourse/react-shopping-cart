import React from 'react';
import { styled } from 'styled-components';
import { theme } from '@styles/theme';

interface CheckBoxProps {
  isChecked?: boolean;
  onClick: () => void;
}

const CheckBox = ({ isChecked = false, onClick }: CheckBoxProps) => {
  return <Wrapper onClick={onClick} type="checkbox" checked={isChecked} />;
};

const Wrapper = styled.input`
  width: 28px;
  height: 28px;

  accent-color: ${theme.colors.primaryBlack};
`;

export default CheckBox;
