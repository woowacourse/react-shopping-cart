import { styled } from 'styled-components';

export const Navbar = styled.div`
  background-color: ${({ theme }) => theme.primaryColor};
  width: 100vw;
  color: ${({ theme }) => theme.lightColor};
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CartIcon = styled.img`
  width: 40px;
  height: 40px;
`;

export const Logo = styled.h1`
  font-size: 40px;
  margin-left: 8px;
`;

export const CartWrapper = styled.div`
  display: flex;
`;

export const CartTitle = styled.div`
  font-size: 24px;
`;

export const CartCountWrapper = styled.div`
  border-radius: 50%;
  background-color: #04c09e;
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;

export const CartCount = styled.div`
  font-size: 16px;
  color: #fff;
`;
