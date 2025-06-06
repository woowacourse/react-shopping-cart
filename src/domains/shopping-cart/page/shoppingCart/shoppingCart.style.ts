import { css } from "@emotion/react";

const titleStyle = css`
  font-weight: 700;
  font-size: 24px;
`;

const subTitleStyle = css`
  font-weight: 500;
  font-size: 12px;
`;

const titleBox = css`
  display: flex;
  gap: 15px;
  flex-direction: column;
`;

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

export {
  titleStyle,
  subTitleStyle,
  titleBox,
  CartProductContainerLayout,
  SelectAllLayout,
};
