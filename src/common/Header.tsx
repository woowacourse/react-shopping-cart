import { PropsWithChildren } from "react";
import styled from "styled-components";

import { HeaderIc } from "../asset";

export default function Header({ children }: PropsWithChildren) {
  return (
    <StyledHeader>
      <StyledTitleWrapper>
        <HeaderIc />
        <StyledTitle>SHOP</StyledTitle>
      </StyledTitleWrapper>
      {children}
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0.8rem 30rem;
`;

const StyledTitle = styled.h1`
  ${({ theme }) => theme.fonts.h1}
  color: ${({ theme }) => theme.colors.white};
  margin-left: 2.6rem;
`;

const StyledTitleWrapper = styled.div`
  display: flex;
`;
