import * as S from "./Button.styled";
import { ButtonStyleProps } from "./type";

interface ButtonProps extends ButtonStyleProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ variant = "primary", size = "full", radius, onClick, children }: ButtonProps) => {
  return (
    <S.Button styles={{ variant, size, radius }} onClick={onClick} disabled={variant === "disabled"}>
      {children}
    </S.Button>
  );
};

export default Button;
