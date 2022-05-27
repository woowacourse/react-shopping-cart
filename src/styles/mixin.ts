import { css } from "styled-components";

const spaceBetween = css`
  display: flex;
  justify-content: space-between;
`;

const directionColumn = css`
  display: flex;
  flex-direction: column;
`;

const alignCenter = css`
  display: flex;
  align-items: center;
`;

const flexCenter = css`
  ${alignCenter};
  justify-content: center;
`;

const flexColumnCenter = css`
  ${flexCenter};
  flex-direction: column;
`;

export { spaceBetween, alignCenter, directionColumn, flexCenter, flexColumnCenter };
