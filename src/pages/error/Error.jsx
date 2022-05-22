import { css } from "@emotion/react";

import ErrorImg from "@/assets/images/error.png";

function Error() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 90vh;
      `}
    >
      <img src={ErrorImg} alt="에러 페이지" />
      <div
        css={css`
          font-size: 25px;
        `}
      >
        에러가 발생했습니다. 관리자에게 문의해주세요.
      </div>
    </div>
  );
}

export default Error;
