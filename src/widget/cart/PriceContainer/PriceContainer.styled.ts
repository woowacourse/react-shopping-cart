import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  margin-bottom: 16px;
`;

export const InfoIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const InfoText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #0a0d13;
`;

export const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  gap: 8px;
  border-top: 1px solid #e5e5e5;
`;
