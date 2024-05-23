import styled from "styled-components";
import { CartItemShowType } from "./ProductItem.tsx";

export const ItemWrapper = styled.div<{ type: CartItemShowType }>`
  height: ${({ type }) => (type === "edit" ? 160 : 120)}px;
  border-top: 1px solid ${({ theme }) => theme.COLOR["grey"]};
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ItemButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 24px;
  margin-top: 12px;
`;

export const ItemInfoBox = styled.div`
  height: 112px;
  margin-top: 12px;
  display: flex;
  align-items: center;
`;

export const ItemInfoTextBox = styled.div`
  height: 93px;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin-left: 30px;
`;

export const ItemImgBox = styled.div<{ $imageUrl: string }>`
  width: 112px;
  height: 112px;

  border-radius: 10px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${({ $imageUrl }) => $imageUrl});
`;

export const UpdateButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const ProductQuantity = styled.span`
  height: 15px;
  font-size: 12px;
  line-height: 15px;
  font-weight: 500;
`;
