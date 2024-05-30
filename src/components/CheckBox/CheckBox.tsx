import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { CheckedBox, NoneCheckedBox } from '../../asset';

const CheckBoxButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const CheckBoxImg = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

interface CheckBoxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isChecked: boolean;
  onClick?: (e: React.MouseEvent) => void;

  disabled?: boolean;
}

function CheckBox({
  isChecked,
  onClick,
  disabled = false,
  ...rest
}: CheckBoxProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };
  const src = disabled || !isChecked ? NoneCheckedBox : CheckedBox;
  return (
    <CheckBoxButton onClick={handleClick} {...rest}>
      <CheckBoxImg src={src} alt="CheckBox" />
    </CheckBoxButton>
  );
}

export default CheckBox;
