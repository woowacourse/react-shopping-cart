import styled from 'styled-components';

export const OrderListPage = styled.div`
  display: flex;
  justify-content: center;
  background-color: #e5e5e5;
  margin-top: -60px;
  padding-top: 60px;
`;

export const pageWrapper = styled.div`
  width: 1320px;
`;
export const pageTitleWrapper = styled.div`
  margin-bottom: 55px;
`;

export const ItemGroupWrapper = styled.div`
  margin-bottom: 74px;
`;

export const OrderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 38px 26px;
  border-bottom: 1px solid ${({ theme }) => theme.GRAY_400};
  background-color: ${({ theme }) => theme.WHITE};
`;
