import { css } from '@emotion/react';

export const loadingStateStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 30rem;
  width: 100%;

  position: fixed;
  top: 30%;
  left: 0%;

  .loading-spinner {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #3498db;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
