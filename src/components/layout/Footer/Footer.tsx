import * as S from "./Footer.styles";

interface FooterProps {
  text: string;
}

export default function Footer({ text }: FooterProps) {
  return (
    <S.StyledFooter>
      <S.StyledSpan>{text}</S.StyledSpan>
    </S.StyledFooter>
  );
}
