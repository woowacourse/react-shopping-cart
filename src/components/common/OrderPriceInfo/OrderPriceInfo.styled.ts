import { COLOR } from '@styles/style.constant';
import styled from 'styled-components';

export const OrderPrice = styled.div`
  width: 100%;
`;

export const PriceGroup = styled.div`
  border-top: 1px solid ${COLOR.borderColor};
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const PriceLabel = styled.span`
  display: inline-block;
  font-size: 16px;
  font-weight: 700;
`;

export const PriceAmount = styled.span`
  font-size: 24px;
  font-weight: 700;
`;
