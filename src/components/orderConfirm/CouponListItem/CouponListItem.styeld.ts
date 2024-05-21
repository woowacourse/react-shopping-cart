import styled from 'styled-components';

export const CouponListItemWrapper = styled.div`
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

export const CouponListItemHeader = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CouponTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: rgba(0, 0, 0, 1);
`;

export const CouponDescription = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  color: rgba(10, 13, 19, 1);
`;

export const CouponDescriptionWrapper = styled.div`
  margin-top: 12px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
