import { css } from "@emotion/react";

import StyledHeader from "./Header.styled";
import HeaderWrapper from "../Wrapper.styled";
import LogoLink from "./logo-link/LogoLink";
import StarcraftLogo from "../../assets/images/starcraft-logo.png";
import Menu from "./menu/Menu";

function Header() {
  return (
    <StyledHeader>
      <HeaderWrapper css={innerHeaderStyle}>
        <LogoLink src={StarcraftLogo} href="/" />
        <Menu />
      </HeaderWrapper>
    </StyledHeader>
  );
}

const innerHeaderStyle = css`
  display: flex;
  justify-content: space-between;
`;

export default Header;
