import styled from 'styled-components';

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;

  text-align: center;
`;

export const TotalPaymentAmountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const TotalPaymentAmountMessage = styled.p`
  ${(props) => props.theme.typography.label};
  color: ${(props) => props.theme.color.black};
`;

export const TotalPaymentAmount = styled.p`
  ${(props) => props.theme.typography.title};
  color: ${(props) => props.theme.color.black};
`;
