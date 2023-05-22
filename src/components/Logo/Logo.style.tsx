import { styled } from 'styled-components';

export const LogoWrapper = styled.button`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.lightColor};
`;

export const CartIcon = styled.img`
  width: 4rem;
  height: 4rem;
`;

export const LogoContainer = styled.div`
  margin-right: 1rem;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;
