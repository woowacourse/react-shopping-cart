import { css, keyframes } from '@emotion/react';

const animate = (value, content) =>
  css`
    animation: ${value} ${keyframes(content)};
  `;

export default animate;
