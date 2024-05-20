/** @jsxImportSource @emotion/react */

import { FallbackProps } from "react-error-boundary";
import { centerAlignStyle } from "./common.style";

import Button from "../Button/Button";

interface ErrorProps extends FallbackProps {
  error: Error;
}

const Error = ({ error, resetErrorBoundary }: ErrorProps) => {
  console.log(error);

  return (
    <div css={centerAlignStyle}>
      <div>something went wrong</div>
      <div>{error.message}</div>
      <Button width="150px" height="60px" fontSize="32px" onClick={resetErrorBoundary}>
        Retry
      </Button>
    </div>
  );
};

export default Error;
