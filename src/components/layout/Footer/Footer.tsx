import * as S from "./Footer.styles";

import { FooterProps } from "./Footer.types";

export default function Footer(props: FooterProps) {
  return (
    <S.Footer {...props}>
      <S.Button onClick={props.handleClick}>
        <S.Span>{props.text}</S.Span>
      </S.Button>
    </S.Footer>
  );
}
