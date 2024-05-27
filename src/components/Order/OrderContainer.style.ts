import { css } from "@emotion/react";

export const orderContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

  gap: "24px",

  height: "50vh",
});

export const orderTitleStyle = css({
  fontSize: "24px",
  fontWeight: "700",
  textAlign: "center",
});

export const orderDescriptionStyle = css({
  fontSize: "12px",
  fontWeight: "500",
  textAlign: "center",
  whiteSpace: "pre-line",
});
