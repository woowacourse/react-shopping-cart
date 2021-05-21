import styled, { css } from "styled-components";

const srOnlyStyle = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export const Label = styled.label`
  ${({ srOnly }) => srOnly && srOnlyStyle}
`;
