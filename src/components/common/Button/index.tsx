import * as S from "./Button.styled";
import { ButtonStyleProps } from "./type";

interface ButtonProps extends ButtonStyleProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ variant, size, onClick, children }: ButtonProps) => {
  return (
    <S.Button styles={{ variant, size }} onClick={onClick}>
      {children}
    </S.Button>
  );
};

export default Button;
