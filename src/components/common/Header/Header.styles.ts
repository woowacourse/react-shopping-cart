import { css } from '@emotion/react';

export const HeaderStyle = css`
  background: #000000;
  width: 100%;
  height: 6.4rem;
  padding: 2.4rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  position: fixed;
  max-width: 43rem;
  transform: translateX(-50%);
  top: 0;
  left: 50%;
`;

export const HeaderButtonStyle = css`
  width: auto;
  height: auto;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;
