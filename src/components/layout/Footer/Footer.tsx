import { useNavigate } from "react-router";

import * as S from "./Footer.styles";

interface FooterProps {
  text: string;
}

export default function Footer({ text }: FooterProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/order-check");
  };

  return (
    <S.StyledFooter>
      <S.StyledButton onClick={handleClick}>
        <S.StyledSpan>{text}</S.StyledSpan>
      </S.StyledButton>
    </S.StyledFooter>
  );
}
