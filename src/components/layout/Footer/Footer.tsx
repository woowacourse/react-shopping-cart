import * as S from "./Footer.styles";

import { FooterProps } from "./Footer.types";

export default function Footer(props: FooterProps) {
  return (
    <S.StyledFooter {...props}>
      <S.StyledButton onClick={props.handleClick}>
        <S.StyledSpan>{props.text}</S.StyledSpan>
      </S.StyledButton>
    </S.StyledFooter>
  );
}
