import styled from '@emotion/styled';

export const Container = styled.main`
  display: flex;
  margin-top: 36px;
  padding: 0 24px;
  height: calc(100vh - 164px);
  justify-content: center;
  align-items: center;
`;

export const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: center;
`;

export const Title = styled.h1`
  color: #000;
  font-size: 24px;
  font-weight: 700;
`;

export const OrderText = styled.p`
  color: #0a0d13;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
`;

export const OrderPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const OrderPriceTitle = styled.p`
  color: #0a0d13;
  font-size: 16px;
  font-weight: 700;
`;

export const OrderPriceText = styled.p`
  color: #000;
  font-size: 24px;
  font-weight: 700;
`;

export const PayConfirmButton = styled.button`
  width: 500px;
  height: 64px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #000000;
  color: #fff;
  font-size: 16px;
  font-weight: 700;

  &:disabled {
    background-color: #bebebe;
  }
`;
