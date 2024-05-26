import styled from 'styled-components';

export const CouponCard = styled.div<{ isCouponCheck: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 12px;
  font-size: 12px;
  font-weight: 500;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  color: ${(props) => (props.isCouponCheck ? 'inherit' : '#D4D4D5')};
`;

export const CouponDetails = styled.div`
  display: flex;
  flex-direction: column;
`;
