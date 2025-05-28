import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

export const Description = styled.p`
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  line-height: 1.5;
`;

export const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

export const PriceText = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

export const Price = styled.p`
  font-size: 24px;
  font-weight: 700;
`;
