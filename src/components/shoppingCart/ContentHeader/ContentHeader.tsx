import * as S from "./ContentHeader.styles";
interface HeaderProps {
  title: string;
  description?: string;
}

export default function ContentHeader({
  title,
  description = "",
}: HeaderProps) {
  return (
    <S.Section>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
    </S.Section>
  );
}
