import { css } from "@emotion/react";

const couponLayout = (isDisabled: boolean) => {
  return css`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 12px 0;
    min-height: 82px;
    opacity: ${isDisabled ? 0.3 : 1};
  `;
};

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
