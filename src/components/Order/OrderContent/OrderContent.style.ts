import { css } from "@emotion/react";

export const OrderContentStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  margin: "64px 0",
  padding: "36px 24px",

  gap: "36px",

  "&>div": {
    width: "100%",
  },
});
