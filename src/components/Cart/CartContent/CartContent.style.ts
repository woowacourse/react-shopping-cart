import { css } from "@emotion/react";

export const CartContentStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  height: "calc(100vh - 128px)",
  margin: "64px 0",
  padding: "36px 24px",

  gap: "36px",

  "&>div": {
    width: "100%",
  },
});
