import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  // position: fixed;
  // top: 0;
  // left: 0;
  height: 80px;
  width: 100vw;
  background-color: ${(props) => props.theme.point};
`;

function Header({ children }) {
  return <HeaderContainer>{children}</HeaderContainer>;
}

export default Header;
