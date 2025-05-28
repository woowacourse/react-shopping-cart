import * as S from "./Button.styled";
import { ButtonStyleProps } from "./type";

interface ButtonProps extends ButtonStyleProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ variant = "primary", size = "full", onClick, children }: ButtonProps) => {
  return (
    <S.Button styles={{ variant, size }} onClick={onClick}>
      {children}
    </S.Button>
  );
};

export default Button;
