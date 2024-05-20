import styled from '@emotion/styled';

export const ConfirmOrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;
  height: 100%;
  gap: ${({ theme }) => theme.spacer.spacing4};
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

export const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

export const Description = styled.p`
  font-size: 12px;
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
