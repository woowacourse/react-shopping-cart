import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  background-color: ${({ theme }) => theme.mainColor};
  padding: 10px;

  min-width: ${({ theme }) => theme.minWidth};
`;

export const Inner = styled.div`
  max-width: ${({ theme }) => theme.innerWidth};
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.h1`
  color: ${({ theme }) => theme.textColorWhite};
  display: flex;
  align-items: center;

  ${({ theme }) => theme.tablet} {
    font-size: 1rem;
  }
`;

export const NavButton = styled.nav`
  display: flex;
  gap: 30px;
  ${({ theme }) => theme.tablet} {
    gap: 10px;
  }
`;

export const NavLink = styled(Link)`
  color: ${({ theme }) => theme.textColorWhite};
  font-weight: bold;

  ${({ theme }) => theme.tablet} {
    font-size: 0.8rem;
  }
`;
