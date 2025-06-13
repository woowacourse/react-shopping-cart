import styled from "@emotion/styled";
import { ReactNode } from "react";
import Flex from "../styled/Flex";

interface HeaderProps {
  left?: ReactNode;
  right?: ReactNode;
}
function Header({ left, right }: HeaderProps) {
  return (
    <HeaderContainer>
      <Logo>{left}</Logo>
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
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: white;
`;

const RightWrapper = styled(Flex)`
  width: fit-content;
  gap: 4px;
`;

export default Header;
