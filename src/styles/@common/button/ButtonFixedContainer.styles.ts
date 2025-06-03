import { css } from "@emotion/react";

export const buttonFixedContainer = css`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  max-width: var(--layout-width);
`;
