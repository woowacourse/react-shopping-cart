import styled from 'styled-components';

export const OrderConfirmation = styled.section`
  width: 26.875rem;
  min-height: 100vh;
  position: relative;

  background-color: ${(props) => props.theme.color.white};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8125rem;

  padding: 2.25rem 1.5rem;
  padding-bottom: 8rem;
`;

export const Content = styled.div`
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

export const Title = styled.p`
  ${(props) => props.theme.typography.title};
  color: ${(props) => props.theme.color.black};
`;

export const OrderSuccessMessage = styled.p`
  ${(props) => props.theme.typography.successMessage};
  color: ${(props) => props.theme.color.captionBlack};
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
