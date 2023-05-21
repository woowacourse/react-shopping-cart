import { styled } from 'styled-components';

export const CartWrapper = styled.button`
  display: flex;
  color: ${({ theme }) => theme.lightColor};
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

export const CartText = styled.div`
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;
