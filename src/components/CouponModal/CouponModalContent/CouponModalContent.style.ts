import { css } from '@emotion/react';

const title = css`
  font-weight: 700;
  font-size: 18px;
`;

const couponList = css`
  margin-top: 16px;
`;

const headLayout = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const closeButton = css`
  border: none;
  background-color: transparent;
  padding: 0px;
  cursor: pointer;
`;

const closeImgLayout = css`
  width: 14px;
  height: 14px;
`;

export { title, couponList, headLayout, closeButton, closeImgLayout };
