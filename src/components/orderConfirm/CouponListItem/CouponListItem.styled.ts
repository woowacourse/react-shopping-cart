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

export const CouponTitle = styled.h2<{ $isActive: boolean }>`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: ${({ $isActive }) => ($isActive ? 'rgba(0, 0, 0, 1)' : 'lightgray')};
`;

export const CouponDescription = styled.p<{ $isActive: boolean }>`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  color: ${({ $isActive }) => ($isActive ? 'rgba(0, 0, 0, 1)' : 'lightgray')};
`;

export const CouponDescriptionWrapper = styled.div`
  margin-top: 12px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
