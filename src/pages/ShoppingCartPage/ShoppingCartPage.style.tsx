import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 36px;
  min-height: calc(100vh - 192px);
  margin-bottom: 64px;
  padding: 36px 24px;
`;

export const CartEmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  padding-top: 64px;
  font-size: 14px;
  font-weight: 400;
  text-align: center;

  img {
    width: 150px;
  }
`;
