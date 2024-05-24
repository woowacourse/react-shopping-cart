import { css } from "@emotion/react";

export const MainStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  margin: "64px 0",
  padding: "36px 24px",

  gap: "32px",

  "&>div": {
    width: "100%",
  },
});
