import { css } from "@emotion/react";
import React from "react";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
      `}
    >
      <div
        css={css`
          position: relative;
          width: 430px;
        `}
      >
        {children}
      </div>
    </div>
  );
}
