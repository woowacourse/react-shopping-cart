/** @jsxImportSource @emotion/react */

import { LoadingPageStyle, LoadingSpinnerContainerStyle } from "./LoadingSpinner.style";

const LoadingSpinner = () => {
  return (
    <div css={LoadingPageStyle}>
      <svg css={LoadingSpinnerContainerStyle} viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50" />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
