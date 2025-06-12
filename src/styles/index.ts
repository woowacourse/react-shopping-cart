import { css } from "@emotion/react";

export const Container = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 36px 24px;
`;

export const ItemContainer = css`
  max-height: 400px;
  overflow-y: auto;
`;

export const ItemInfo = css`
  display: flex;
  gap: 24px;
`;

export const ItemContent = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
`;
