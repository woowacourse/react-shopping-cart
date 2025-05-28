import { css } from "@emotion/react";

export const ItemContainer = css`
  width: 100%;
  height: 160px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  padding-top: 12px;
  margin-top: 10px;

  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

export const ItemController = css`
  display: flex;
  justify-content: space-between;
`;

export const ItemInfo = css`
  display: flex;
  gap: 24px;
`;

export const ItemDetail = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ItemContent = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
`;

export const CountContainer = css`
  display: flex;
  gap: 4.5px;
  align-items: center;
`;

export const ProductImage = css`
  width: 112px;
  height: 112px;
  border-radius: 8px;
  object-fit: fill;
`;

export const ItemTitle = css`
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-normal);
`;
export const ItemPrice = css`
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
`;

export const CountControlButton = css`
  width: 24px;
  height: 24px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background-color: white;
`;

export const DeleteButton = css`
  width: 40px;
  height: 24px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background-color: white;
`;
