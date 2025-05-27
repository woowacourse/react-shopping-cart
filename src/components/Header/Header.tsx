import * as S from './Header.styles';

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

export default function Header({ title, children }: HeaderProps) {
  return (
    <S.headerLayout>
      {title}
      {children}
    </S.headerLayout>
  );
}
