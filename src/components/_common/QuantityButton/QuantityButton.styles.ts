import { css } from "styled-components";

export const disabledClickStyles = css`
  cursor: not-allowed;
  opacity: 0.5;
  pointer-events: none;

  .bg {
    fill: #e0e0e0;
  }

  .icon {
    stroke: #9e9e9e;
  }
`;

export const enabledClickStyles = css`
  cursor: pointer;
  opacity: 1;
  pointer-events: all;

  .bg {
    fill: white;
  }

  .icon {
    stroke: #363636;
  }
`;
