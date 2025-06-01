import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Description = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const DescriptionText = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #0a0d13;
`;

export const IndividualPriceBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PriceRow = styled.div`
  height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PriceLabel = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

export const PriceAmount = styled.p`
  font-size: 24px;
  font-weight: 700;
`;
