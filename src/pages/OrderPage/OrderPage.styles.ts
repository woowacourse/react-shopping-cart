import styled from "@emotion/styled";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 32px 24px 36px;
`;

export const BackIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
  flex-grow: 1;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

export const Label = styled.div`
  font-weight: 700;
  font-size: 18px;
`;

export const Price = styled.div`
  font-weight: 700;
  font-size: 26px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  max-height: 200px;
  padding-right: 12px;
`;

export const CartItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
`;

export const CartItemImageWrapper = styled.div`
  width: 112px;
  height: 112px;
`;

export const CartItemImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
  object-position: center;
  background-color: #f0f0f0;
`;

export const CartItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  justify-content: center;
`;

export const CartItemName = styled.p`
  font-weight: 500;
  font-size: 16px;
`;

export const CartItemPrice = styled.p`
  font-weight: 700;
  font-size: 26px;
`;

export const ShippingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 0;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  width: 100%;
`;

export const Button = styled.button`
  width: 100%;
  height: 48px;
  border: 1px solid rgba(51, 51, 51, 0.25);
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;
