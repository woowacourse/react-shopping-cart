import * as S from "./Header.styles";

interface HeaderProps {
  title: string;
  handleTitleClick?: () => void;
}

export default function Header({ title, handleTitleClick }: HeaderProps) {
  return (
    <S.headerLayout>
      <S.Title onClick={handleTitleClick}>{title}</S.Title>
    </S.headerLayout>
  );
}
