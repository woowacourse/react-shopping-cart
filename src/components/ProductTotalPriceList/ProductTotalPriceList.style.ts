import styled from 'styled-components';

export const Notification = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 12px;
  margin-top: 32px;

  .notification-img {
    width: 16px;
    height: 16px;
  }

  .notification-text {
    color: #0a0d13;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
  }
`;

export const OrderPrice = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  gap: 15px;
`;

export const PriceGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .price-group_title {
    color: rgba(10, 13, 19, 1);
    font-weight: 700;
    font-size: 16px;
  }

  .price-group_price {
    color: rgba(0, 0, 0, 1);
    font-weight: 700;
    font-size: 24px;
    line-height: 34.75px;
  }
`;
