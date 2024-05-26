import { css } from "@emotion/react";

export const CartItemContainerStyle = css({
  display: "flex",
  flexDirection: "column",

  padding: "12px",
  gap: "20px",
});

export const CartItemEmptyStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  width: "100%",
  fontSize: "20px",
  fontWeight: "700",
  textAlign: "center",

  marginTop: "50%",
});
