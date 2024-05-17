import { css } from '@emotion/react';

interface ErrorComponentProps {
  error: Error;
}

const ErrorComponent = ({ error }: ErrorComponentProps) => {
  return (
    <div css={container}>
      <div>에러가 발생했습니다.</div>
      <div>에러 : {error.message}</div>
    </div>
  );
};

export default ErrorComponent;

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 24px;
`;
