import { StyledButton } from '@commons/Button/Button.styled';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  height?: string;
  ariaLabel?: string;
  backgroundColor?: string;
  text?: string;
  fontSize?: string;
  color?: string;
}

const Button = (props: ButtonProps) => {
  const {
    width = '',
    height = '',
    ariaLabel = '',
    backgroundColor = '',
    text = '',
    fontSize = '',
    color = '',
    onClick,
    type = 'button',
    name = '',
  } = props;

  return (
    <StyledButton
      aria-label={ariaLabel}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      color={color}
      onClick={onClick}
      type={type}
      name={name}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
