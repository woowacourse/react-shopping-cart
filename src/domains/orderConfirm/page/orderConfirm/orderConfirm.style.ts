import { css } from "@emotion/react";

const confirmLayout = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const totalPriceBox = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const titleText = css`
  font-weight: 700;
  font-size: 24px;
`;

const subtitleText = css`
  font-weight: 700;
  font-size: 16px;
`;

const bodyText = css`
  font-weight: 500;
  font-size: 12px;
`;

export { confirmLayout, titleText, subtitleText, totalPriceBox, bodyText };
