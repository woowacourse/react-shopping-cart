import { PropsWithChildren } from "react";
import styled from "styled-components";

import { HeaderIc } from "../../asset";

export default function Header({ children }: PropsWithChildren) {
  return (
    <HeaderContainer>
      <TitleWrapper>
        <HeaderIc />
        <Title>SHOP</Title>
      </TitleWrapper>
      {children}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0.8rem 30rem;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.h1}
  color: ${({ theme }) => theme.colors.white};
  margin-left: 2.6rem;
`;

const TitleWrapper = styled.div`
  display: flex;
`;
