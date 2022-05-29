import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const CartItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding: 2rem;
  border-top: 1.5px solid #cccccc;
`;

export const ItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

export const ItemImage = styled.img`
  width: 9rem;
  height: 10rem;
`;

export const ItemRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 20px;
`;

export const CartButtonStyle = css`
  border: none;
  background-color: inherit;
  font-size: 2rem;
`;
