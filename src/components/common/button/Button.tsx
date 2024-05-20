import React from 'react';
import {
  StyledButton,
  StyledButtonImg,
  StyledButtonText,
} from './Button.styled';

interface ButtonProps {
  iconSrc?: string;
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  clicked?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  iconSrc,
  text,
  onClick,
  disabled,
}) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {text && <StyledButtonText>{text}</StyledButtonText>}
      {iconSrc && <StyledButtonImg src={iconSrc} />}
    </StyledButton>
  );
};
