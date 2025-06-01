import * as S from "./ShoppingCartHeader.styles";
interface HeaderProps {
  title: string;
  description?: string;
}

export default function ShoppingCartHeader({
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
