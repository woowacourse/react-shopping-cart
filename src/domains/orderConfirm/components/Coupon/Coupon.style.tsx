import { css } from "@emotion/react";

const couponLayout = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 0;
  min-height: 82px;
`;

const checkBoxLayout = css`
  display: flex;
  align-items: center;
  gap: 4px;

  font-weight: 700;
  font-size: 16px;
`;

const infoTextLayout = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export { couponLayout, checkBoxLayout, infoTextLayout };
