import styled from "styled-components";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 3;

  width: 100vw;
  height: 80px;
  padding: 0 40px 0 20px;
  background-color: ${({ theme }) => theme.color.primary};
  box-shadow: 0 4px 10px 2px #bbb;
`;

const NavButtonContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 220px;
`;

export { HeaderContainer, NavButtonContainer };
