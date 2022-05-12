import { css } from "@emotion/react";
import S from "../styled";
import StarcraftLogo from "../../assets/images/starcraft-logo.png";
import LogoLink from "./logo-link/LogoLink";
import Menu from "./menu/Menu";

function Header({ className = "header" }) {
  return (
    <S.Header className={className}>
      <S.Wrapper css={innerHeaderStyle}>
        <LogoLink src={StarcraftLogo} href="http://naver.com" />
        <Menu />
      </S.Wrapper>
    </S.Header>
  );
}

const innerHeaderStyle = css`
  display: flex;
  justify-content: space-between;
`;

export default Header;
