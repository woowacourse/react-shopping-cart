import { css } from "@emotion/react";

import NotFoundImg from "@/assets/images/404.png";

function NotFound() {
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
      <img src={NotFoundImg} alt="존재하지 않는 페이지" />
      <div
        css={css`
          font-size: 25px;
        `}
      >
        존재하지 않는 페이지입니다.
      </div>
    </div>
  );
}

export default NotFound;
