import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: ${({ theme }) => theme.spacer.spacing4};
`;

export const OrderSummary = styled.div`
  display: flex;
  font-size: 12px;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacer.spacing1};
`;

export const TotalPrice = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacer.spacing2};
`;
