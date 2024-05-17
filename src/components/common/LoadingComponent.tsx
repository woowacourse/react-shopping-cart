import { css } from '@emotion/react';

const LoadingComponent = () => {
  return <div css={loadingContainer}>Loading...</div>;
};

const loadingContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default LoadingComponent;
