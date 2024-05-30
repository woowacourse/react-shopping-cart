import { css } from "@emotion/react";

export const CartItemDetailControlsStyle = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const CartItemContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  marginBottom: "12px",
});

export const CartItemQuantityContainerStyle = css({
  display: "flex",
  gap: "4px",
});

export const CartItemQuantityStyle = css({
  textAlign: "center",
  minWidth: "24px",
});
