import { css } from '@emotion/react';

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

const spinnerWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export { titleStyle, subTitleStyle, titleBox, spinnerWrapper };
