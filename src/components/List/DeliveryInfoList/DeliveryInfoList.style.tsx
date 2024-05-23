import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 16px;
`;

export const CheckListContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const CheckListItemContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

export const CheckListContent = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontSize.medium};
`;
