import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  margin-top: 15px;
`;

export const InfoIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 3px;
  font-size: 12px;

  p {
    padding-top: 2px;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
`;

export const PriceDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  padding: 15px 0px;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
`;

export const PriceTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

export const PriceValue = styled.p`
  font-size: 24px;
  font-weight: bold;
`;
