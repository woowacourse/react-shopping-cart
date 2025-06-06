import { css } from "@emotion/react";

const CartProductContainerLayout = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: auto;
`;

const SelectAllLayout = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export { CartProductContainerLayout, SelectAllLayout };
