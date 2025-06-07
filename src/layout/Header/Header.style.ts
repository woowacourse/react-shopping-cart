import { css } from "@emotion/react";

const headerLayout = css`
  position: sticky;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-sizing: border-box;
  width: 100%;
  min-height: 64px;

  background-color: black;
  color: #fff;
  font-size: 20px;
  font-weight: 800;

  z-index: 1;
`;

export { headerLayout };
