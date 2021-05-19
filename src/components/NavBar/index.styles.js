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
    margin-right: 0.3rem;
  }
`;

export const Menu = styled.ul`
  display: flex;
  align-items: center;

  & > li {
    margin-left: 1rem;
  }
`;
