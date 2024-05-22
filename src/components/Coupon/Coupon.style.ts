import styled from 'styled-components';

export const CouponStyle = styled.section`
  position: relative;
`;

export const Notification = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 17px;
  position: fixed;
  top: 82px;
  background-color: white;
  padding-bottom: 16px;
  left: 31px;
  width: calc(100% - 31px);

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
  margin-top: 25px;
`;

export const Item = styled.button`
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 12px;
  margin-bottom: 24px;
  width: 100%;

  font-weight: 500;
  font-size: 12px;
  line-height: 15px;

  .coupon_checkbox-group {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;

    .coupon_name {
      font-weight: 700;
      font-size: 16px;
    }
  }

  .coupon_expiration {
    margin-bottom: 4px;
  }
`;
