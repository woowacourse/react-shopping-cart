import styled from 'styled-components';

const NavBar = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  gap: 712px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--cyan);
  opacity: 0.95;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
`;

const LogoText = styled.span`
  font-weight: 900;
  font-size: 40px;
  color: var(--white);
`;

const MenuBox = styled.div`
  display: flex;
  gap: 44px;
`;

const MenuText = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  text-transform: capitalize;
  color: var(--white);
`;

export { NavBar, LogoText, MenuBox, MenuText };
