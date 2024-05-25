import styled from 'styled-components';

export const CouponContainer = styled.div`
  margin: 12px 0;
`;

export const Notification = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 12px;

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

export const CouponList = styled.div`
  display: grid;
  gap: 24px;
`;

export const CheckBoxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: '32px 0';
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
`;

export const CheckBoxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  color: rgba(10, 13, 19, 1);
`;

export const CheckBoxStyle = styled.button`
  img {
    width: 24px;
    height: 24px;
  }
`;
