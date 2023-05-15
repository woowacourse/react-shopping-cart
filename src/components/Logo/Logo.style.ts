import { styled } from 'styled-components';

export const LogoWrapper = styled.button`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.lightColor};
`;

export const CartIcon = styled.img`
  width: 40px;
  height: 40px;
`;

export const Logo = styled.h1`
  font-size: 40px;
  margin-left: 8px;
`;
