import { css } from '@emotion/react';

import { THEME } from '@/constants/theme';

export const loadingWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const loadingSpinner = css`
  width: 16px;
  height: 16px;

  border: 2px solid #3498db;
  border-top: 2px solid transparent;
  border-radius: 50%;

  animation: rotate 1s linear infinite;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const countWrapper = css`
  width: 120px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const countButton = (isDisabled?: boolean) => css`
  width: 24px;
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${THEME.LIGHT_BLACK};
  border-radius: 8px;
  padding: 4px;

  background-color: ${THEME.WHITE};

  font-size: 24px;

  &:hover {
    opacity: ${isDisabled ? THEME.DISABLED_OPACITY : THEME.HOVER_OPACITY};
  }

  cursor: ${isDisabled ? 'auto' : 'pointer'};
  opacity: ${isDisabled ? THEME.DISABLED_OPACITY : 1};
`;
