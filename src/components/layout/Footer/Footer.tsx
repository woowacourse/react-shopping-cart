import * as Styled from "./Footer.styles";

import { FooterProps } from "./Footer.types";

export default function Footer(props: FooterProps) {
  return (
    <Styled.Footer {...props}>
      <Styled.Button onClick={props.handleClick}>
        <span>{props.text}</span>
      </Styled.Button>
    </Styled.Footer>
  );
}
