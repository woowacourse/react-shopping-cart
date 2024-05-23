import { COLOR } from '@styles/style.constant';
import styled from 'styled-components';

export const CouponCard = styled.div<{ $isDisabled: boolean }>`
  color: ${({ $isDisabled }) => ($isDisabled ? COLOR.disableButtonColor : COLOR.black)};
  border-top: 1px solid ${COLOR.borderColor};
  padding: 12px 0;
`;

export const CouponName = styled.h4`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
  margin-left: 8px;
  margin-bottom: 8px;
`;

export const CouponCardTop = styled.div`
  display: flex;
`;

export const CouponInfo = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  margin-bottom: 4px;
`;
