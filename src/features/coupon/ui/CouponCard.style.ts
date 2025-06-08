import styled from '@emotion/styled';

export const CouponCardContainer = styled.div`
  width: 100%;
  height: 82px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  flex: 1;
`;

export const CouponCheckBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CouponDescription = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

export const CouponValidInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CouponValidInfo = styled.span`
  font-size: 12px;
  font-weight: 500;
`;
