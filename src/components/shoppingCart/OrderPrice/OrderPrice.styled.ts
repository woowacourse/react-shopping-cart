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
  span {
    font-weight: 700;
  }
  span:nth-child(1) {
    font-size: 16px;
  }
  span:nth-child(2) {
    font-size: 24px;
  }
`;
