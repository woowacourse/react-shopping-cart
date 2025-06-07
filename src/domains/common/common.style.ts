import { css } from "@emotion/react";

const titleBox = css`
  display: flex;
  gap: 15px;
  flex-direction: column;
`;

const titleStyle = css`
  font-weight: 700;
  font-size: 24px;
`;

const subTitleStyle = css`
  font-weight: 500;
  font-size: 12px;
  line-height: 1.2rem;
`;

const infoImgLayout = css`
  width: 16px;
  height: 16px;
`;

const intoText = css`
  font-weight: 500;
  font-size: 12px;
`;

export { titleBox, titleStyle, subTitleStyle, infoImgLayout, intoText };
