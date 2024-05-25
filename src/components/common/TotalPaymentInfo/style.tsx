import styled from 'styled-components';
import { Divider } from '../../../commonStyle';

export const TotalPaymentInfo = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const PaymentInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TotalDivider = Divider;

export const PaymentLabel = styled.p`
  ${(props) => props.theme.typography.label}
  color: ${(props) => props.theme.color.black}
`;

export const PaymentPrice = styled.p`
  ${(props) => props.theme.typography.price}
  color: ${(props) => props.theme.color.black}
`;
