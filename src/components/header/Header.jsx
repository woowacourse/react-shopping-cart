import { css } from "@emotion/react";

import StyledHeader from "@/components/header/Header.styled";
import HeaderWrapper from "@/components/wrapper/ContentWrapper.styled";
import LogoLink from "@/components/header/logo-link/LogoLink";
import Menu from "@/components/header/menu/Menu";

function Header() {
  return (
    <StyledHeader>
      <HeaderWrapper css={innerHeaderStyle}>
        <LogoLink />
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
