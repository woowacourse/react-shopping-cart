import * as S from './Button.styles';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: React.ReactNode;
}

export default function Button({ onClick, children, ...props }: ButtonProps) {
  return (
    <S.Button onClick={onClick} {...props}>
      {children}
    </S.Button>
  );
}
