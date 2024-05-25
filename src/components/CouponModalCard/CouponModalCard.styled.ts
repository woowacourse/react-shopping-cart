import styled from 'styled-components';
import { Border } from '../TotalAmount/TotalAmount.styled';

interface CouponModalCardContainerProps {
  $opacity: string;
}

export const CouponModalCardContainer = styled.div<CouponModalCardContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  opacity: ${(props) => props.$opacity};
`;

export const CouponModalCardBorder = styled(Border)``;

export const CouponName = styled.p`
  font-family: var(--font-Noto-Sans-KR);
  font-weight: bold;
  font-size: 1.6rem;
  font-color: var(--black-color-1);
`;

export const CheckBoxHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const CouponDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const CouponCondition = styled.p`
  font-size: 1.2rem;
  font-color: var(--black-color-1);
`;
