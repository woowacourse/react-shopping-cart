import { StyledButton } from '@commons/Button/Button.styled';

interface ButtonProps {
  ariaLabel: string;
  buttonSize: string;
  buttonColor: string;
  text: string;
  fontSize: string;
  fontColor: string;
  onClick: () => void;
  type?: 'button' | 'reset' | 'submit' | undefined;
  name?: string;
}

const Button = (props: ButtonProps) => {
  const {
    ariaLabel,
    buttonSize,
    buttonColor,
    text,
    fontSize,
    fontColor,
    onClick,
    type = 'button',
    name = 'button',
  } = props;

  return (
    <StyledButton
      aria-label={ariaLabel}
      buttonSize={buttonSize}
      buttonColor={buttonColor}
      fontSize={fontSize}
      fontColor={fontColor}
      onClick={onClick}
      type={type}
      name={name}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
