import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 3;

  width: 100vw;
  height: 80px;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.point};
  box-shadow: 0 4px 10px 2px #bbb;
`;

export const NavButtonWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 220px;
`;
