import { css, keyframes } from '@emotion/react';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const spinnerLayout = (size?: number, color?: string) => {
  const borderWidth = size ? Math.round(size / 10) : 1;

  return css`
    width: ${size}px;
    height: ${size}px;

    /* size가 있을 때 */
    border: ${borderWidth
      ? `${borderWidth}px solid rgba(0, 0, 0, 0.1)`
      : '1px solid black'};
    border-top: ${borderWidth
      ? `${borderWidth}px solid ${color}`
      : '1px solid black'};

    border-radius: 50%;
    animation: ${rotate} 1s linear infinite;

    box-sizing: border-box;
  `;
};

export { spinnerLayout };
