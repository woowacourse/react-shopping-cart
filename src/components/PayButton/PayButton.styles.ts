import { css } from '@emotion/react';

import { theme } from '../../styles';

export const ButtonStyle = css`
  background: ${theme.color.black};
  color: ${theme.color.white};
  width: 100%;
  height: 6.4rem;
  padding: 2.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: fixed;
  max-width: 43rem;
  transform: translateX(-50%);
  bottom: 0;
  left: 50%;
  cursor: pointer;

  border: none;
  border-radius: 0;
`;
