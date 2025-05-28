import { useNavigate } from "react-router";

import * as S from "./Footer.styles";

import { FooterProps } from "./Footer.types";

export default function Footer({ text, active }: FooterProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/order-check");
  };

  return (
    <S.StyledFooter text={text} active={active}>
      <S.StyledButton onClick={handleClick}>
        <S.StyledSpan>{text}</S.StyledSpan>
      </S.StyledButton>
    </S.StyledFooter>
  );
}
