import * as S from "./Button.styles";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  isDisabled?: boolean;
  children: React.ReactNode;
}

export default function Button({
  onClick,
  children,
  isDisabled = false,
  ...props
}: ButtonProps) {
  return (
    <S.Button onClick={onClick} isDisabled={isDisabled} {...props}>
      {children}
    </S.Button>
  );
}
