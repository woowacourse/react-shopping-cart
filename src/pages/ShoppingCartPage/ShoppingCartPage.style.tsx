import styled from 'styled-components';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 36px;
  min-height: calc(100vh - ${({ theme }) => theme.boxHeight.md} * 3);
  margin-bottom: ${({ theme }) => theme.boxHeight.md};
  padding: 36px 24px;
`;

export const CartEmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  padding-top: ${({ theme }) => theme.boxHeight.md};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  text-align: center;

  img {
    width: 150px;
  }
`;
