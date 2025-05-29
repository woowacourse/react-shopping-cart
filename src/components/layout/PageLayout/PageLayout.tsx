import { css } from "@emotion/react";
import React from "react";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        background-color: aliceblue;
      `}
    >
      <div
        css={css`
          position: relative;
          width: 430px;
          background-color: white;
        `}
      >
        {children}
      </div>
    </div>
  );
}
