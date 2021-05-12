import styled from 'styled-components';

export const OrderListPage = styled.div`
  display: flex;
  min-height: ${({ theme }) => theme.PAGE_HEIGHT};
  flex-direction: column;
  align-items: center;
  background-color: #e5e5e5;
  padding-top: ${({ theme }) => theme.HEADER_HEIGHT};
`;

export const PageWrapper = styled.div`
  width: 1320px;
`;

export const PageTitleWrapper = styled.div`
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

export const PageBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 100px;
`;
