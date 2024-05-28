import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  margin-top: 15px;
`;

export const PriceDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  padding: 15px 0px;
  border-top: 1px solid ${({ theme }) => theme.color.primary.light};
  border-bottom: 1px solid ${({ theme }) => theme.color.primary.light};
`;
