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
  width: 2.6rem;
  height: 2.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 3.2rem;
    height: 3.2rem;
  }
`;

export const CartCount = styled.div`
  font-size: 1.6rem;
  color: #fff;
`;

export const CartText = styled.div`
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;
