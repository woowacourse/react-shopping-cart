import { styled } from 'styled-components';

export const CartPageWrapper = styled.section`
  display: flex;
  justify-content: space-between;

  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const FlexWrapper = styled.section`
  display: flex;

  justify-content: space-between;

  width: 100%;
`;

export const FlexColWrapper = styled.section`
  flex: 1.2;
  display: flex;
  flex-direction: column;
`;
