import { css } from '@emotion/react';

export const baseButtonStyle = css`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
`;

export const ConfirmButtonStyle = (disabled?: boolean) => css`
  border: 0;
  background-color: ${disabled ? '#ccc' : '#333333'};
  color: ${disabled ? '#666' : '#ffffff'};
  padding-left: 18px;
  padding-right: 18px;
  height: 36px;
  border-radius: 5px;
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
`;

export const CancelButtonStyle = (
  variation: 'primary' | 'secondary' = 'secondary',
  widthSize: string
) => {
  const base = css`
    border: 1px solid #ccc;
    padding-left: 18px;
    padding-right: 18px;
    height: 36px;
    border-radius: 5px;
    cursor: pointer;
    width: ${widthSize};
  `;

  if (variation === 'primary') {
    return css`
      ${base};
      background-color: black;
      color: white;
      border: none;

      &:hover {
        background-color: #222;
      }
    `;
  }

  return css`
    ${base};
    background-color: white;
    color: #333;
    border: 1px solid #ccc;

    &:hover {
      background-color: #f5f5f5;
    }
  `;
};
