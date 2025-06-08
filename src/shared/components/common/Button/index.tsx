import * as S from "./Button.styled";
import { ButtonSize, ButtonVariant } from "./type";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = ({ variant = "primary", size = "full", onClick, children }: ButtonProps) => {
  return (
    <S.Button variant={variant} size={size} onClick={onClick} disabled={variant === "disabled"}>
      {children}
    </S.Button>
  );
};

export default Button;
