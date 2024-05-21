import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 36px;
  min-height: calc(100vh - ${({ theme }) => theme.boxHeight.md} * 3);
  margin-bottom: ${({ theme }) => theme.boxHeight.md};
  padding: 36px 24px;
`;

export const OrderDetailText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.5;
`;
