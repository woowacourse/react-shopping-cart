import styled from 'styled-components';

export const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 3px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-bottom: 10px;

  p {
    padding-top: 2px;
  }
`;

export const InfoIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const CouponItemList = styled.div`
  margin: 8px 0px;
`;

export const CouponItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;
