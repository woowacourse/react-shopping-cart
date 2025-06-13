import styled from '@emotion/styled';

export const ErrorDescription = styled.div`
  text-align: center;
  margin-top: 20px;
  font-weight: 700;
  line-height: 1.5;
`;

export const Container = styled.div`
  display: flex;
  height: calc(100vh - 64px);
  flex-direction: column;
`;

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 27px;
  text-align: center;
`;

export const Title = styled.p`
  font-size: 24px;
  font-weight: 700;
`;

export const Description = styled.p`
  font-size: 12px;
  line-height: 150%;
`;
export const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  gap: 12px;
`;

export const Price = styled.p`
  font-size: 24px;
`;
