import styled from "@emotion/styled";
import { ReactNode } from "react";
import Flex from "./Flex";

interface HeaderProps {
  title: string;
  right?: ReactNode;
}
function Header({ title, right }: HeaderProps) {
  return (
    <HeaderContainer>
      <Logo>{title}</Logo>
      <RightWrapper>{right}</RightWrapper>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  height: 64px;
  display: flex;
  position: sticky;
  top: 0;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: black;
  z-index: 999;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: white;
`;

const RightWrapper = styled(Flex)`
  width: fit-content;
  gap: 4px;
`;

export default Header;
