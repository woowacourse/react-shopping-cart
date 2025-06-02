import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid #0000001a;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const Image = styled.img`
  width: 80px;
  height: 80px;

  border-radius: 8px;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
`;

export const ProductInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const ProductName = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
`;

export const Price = styled.p`
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 8px;
`;

export const CartItemQuantity = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
`;
