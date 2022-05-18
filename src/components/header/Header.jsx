import { css } from "@emotion/react";

import StyledHeader from "@/components/header/Header.styled";
import HeaderWrapper from "@/components/wrapper/Wrapper.styled";
import LogoLink from "@/components/header/logo-link/LogoLink";
import Menu from "@/components/header/menu/Menu";

function Header() {
  return (
    <StyledHeader>
      <HeaderWrapper css={innerHeaderStyle}>
        <LogoLink href="/" />
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
