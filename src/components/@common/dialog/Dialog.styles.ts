import { css } from '@emotion/react';

export const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const content = (
  position: 'center' | 'bottom' = 'center',
  size: 'small' | 'medium' | 'large' = 'medium'
) => css`
  position: fixed;
  background-color: white;
  border-radius: 10px;

  ${position === 'bottom'
    ? `
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  `
    : `
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `}

  ${(() => {
    switch (size) {
      case 'small':
        return `
          width: 320px;
          max-width: 90%;
          padding: 16px;
        `;
      case 'large':
        return `
          width: 800px;
          max-width: 90%;
          padding: 24px;
        `;
      case 'medium':
      default:
        return `
          width: 500px;
          max-width: 90%;
          padding: 20px;
        `;
    }
  })()}
`;

export const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

export const closeButton = css`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #666;
  width: 100%;

  &:hover {
    color: #000;
  }
`;
