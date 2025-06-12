import { css } from '@emotion/react';
import { borderRadius } from '../../styles/common';

export const ControllerBoxStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 2.4rem;
`;

export const ControllerButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border: 1px solid #e0e0e0;
  ${borderRadius}
  background-color: #fff;
  cursor: pointer;
`;
