import styled from "styled-components";

export const Navbar = styled.div`
  width: 100vw;
  color: ${({ theme }) => theme.color.light};
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
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
  cursor: pointer;
`;

export const LogoImage = styled.img`
  height: 35px;
`;

export const CartWrapper = styled.div`
  display: flex;
  cursor: pointer;
`;

export const CartTitle = styled.div`
  font-size: 24px;
  color: ${({ theme }) => theme.color.dark};
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
