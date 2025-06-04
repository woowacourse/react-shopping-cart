import styled from '@emotion/styled';

export const Container = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 36px 24px 120px 24px;
`;

export const OrderItemList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const ShippingOptionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ShippingOptionTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
`;

export const ShippingOptionSelectRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ShippingOptionSelectText = styled.label`
  font-size: 12px;
  font-weight: 500;
`;

export const CouponContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const NoticeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const NoticeText = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #0a0d13;
`;

export const CouponList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CouponItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CouponTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CouponTitle = styled.label`
  font-size: 16px;
  font-weight: 700;
`;

export const CouponDescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CouponDescription = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
`;
