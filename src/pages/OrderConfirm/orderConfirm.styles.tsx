import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: calc(100vh - 100px);
  padding: 30px 20px;
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

export const OrderList = styled.div`
  overflow: scroll;
  height: 240px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  scrollbar-color: transparent transparent;
`;

export const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const OrderInfoTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;
