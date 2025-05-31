import { css } from "@emotion/react";

export const visuallyHidden = css`
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  margin: -1px !important;
  padding: 0 !important;
  border: 0 !important;
  clip: rect(0 0 0 0) !important;
  overflow: hidden !important;
  white-space: nowrap !important;
`;
