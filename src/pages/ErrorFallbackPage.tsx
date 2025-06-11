import { css } from "@emotion/css";
import { Link } from "react-router";

export const ErrorFallbackPage = () => {
  return (
    <div className={ErrorFallbackPageStyles}>
      <h1 className={ErrorTitle}>잘못된 접근입니다 😢</h1>
      <Link to="/">장바구니 확인하러 가기</Link>
    </div>
  );
};

const ErrorFallbackPageStyles = css`
  min-height: 100dvh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorTitle = css`
  padding: 20px;
`;
