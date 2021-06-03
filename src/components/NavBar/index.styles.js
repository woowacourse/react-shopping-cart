import styled from 'styled-components';

export const Nav = styled.nav`
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  background-color: var(--color-mint);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  color: var(--color-white);
  z-index: 50;
`;

export const InnerNav = styled.div`
  max-width: 60rem;
  height: 100%;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-large);
  font-weight: var(--weight-bold);

  & :first-child {
    margin: 0.125rem 0.3rem 0 0;
  }
`;

export const Menu = styled.ul`
  display: flex;
  align-items: center;
`;

export const NavItem = styled.li`
  margin-left: 1.5rem;

  &:hover *,
  & *:hover {
    opacity: 1;
    font-weight: 800;
  }
`;

export const AlertNavItem = styled(NavItem)`
  position: relative;
  cursor: pointer;
  padding: 0.5rem 0 0.5rem 1rem;
`;

export const Alert = styled.span`
  position: absolute;
  background-color: #ec0000;
  opacity: 0.825;
  line-height: 1.875;
  border-radius: 50%;
  font-size: 0.625rem;
  font-weight: 800;
  top: -0.225rem;
  right: -1rem;
  min-width: 1.3rem;
  padding: 2.5px;
  align-items: center;
  justify-content: center;
  display: flex;
`;
