import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  ${({ theme }) => css`
    background-color: ${theme.brandColor_1};
    min-width: ${theme.minWidth};
  `}
  padding: 10px;
`;

export const Inner = styled.div`
  max-width: ${({ theme }) => theme.innerWidth};
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.h1`
  display: flex;
  align-items: center;

  font-size: 1.5rem;
  ${({ theme }) => css`
    color: ${theme.whiteColor_1};

    ${theme.tablet} {
      font-size: 1rem;
    }
  `}
`;

export const NavButton = styled.nav`
  display: flex;
  gap: 30px;
  ${({ theme }) => theme.tablet} {
    gap: 10px;
  }
`;

export const NavLink = styled(Link)`
  font-weight: bold;

  ${({ theme }) => css`
    color: ${theme.whiteColor_1};

    ${theme.tablet} {
      font-size: 0.8rem;
    }
  `}
`;
