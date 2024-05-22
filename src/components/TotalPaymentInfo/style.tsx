import styled from 'styled-components';

export const TotalPaymentInfo = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const PaymentInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PaymentCaption = styled.p`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  ${(props) => props.theme.typography.caption}
  color: ${(props) => props.theme.color.captionBlack};
`;

export const Divider = styled.div`
  border: 0.5px solid ${(props) => props.theme.color.borderGray};
`;

export const PaymentLabel = styled.p`
  ${(props) => props.theme.typography.label}
  color: ${(props) => props.theme.color.black}
`;

export const PaymentPrice = styled.p`
  ${(props) => props.theme.typography.price}
  color: ${(props) => props.theme.color.black}
`;
