import { css } from "@emotion/react";

const notFoundPageLayout = css`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  color: #333;
  text-align: center;
`;
const notFoundPageTitle = css`
  font-size: 48px;
  margin-bottom: 16px;
  color: #dc3545;
`;

const notFoundPageMessage = css`
  font-size: 18px;
  line-height: 1.5;
`;

export { notFoundPageLayout, notFoundPageTitle, notFoundPageMessage };
