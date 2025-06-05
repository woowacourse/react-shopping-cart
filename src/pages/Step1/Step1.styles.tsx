import styled from "@emotion/styled";

export const ButtonWrapper = styled.div`
  align-items: flex-end;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const ReceiptTextWrapper = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ShoppingCartSection = styled.section`
  padding: 36px 18px;
  width: 100%;
  height: 100%;
`;

export const EmptyCartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CartItemList = styled.div`
  height: 340px;
  overflow: scroll;
`;
