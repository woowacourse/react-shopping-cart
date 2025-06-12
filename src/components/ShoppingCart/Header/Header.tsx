import * as S from "./Header.styles";
interface HeaderProps {
  title: string;
  description?: string;
}

export default function Header({ title, description = "" }: HeaderProps) {
  return (
    <S.Section>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
    </S.Section>
  );
}
