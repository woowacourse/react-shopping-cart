import { css } from "@emotion/react";
import { COLOR_PALETTE } from "../../../colorPalette";

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

export const CartItemImageStyle = css({
  width: "112px",
  height: "112px",
  borderRadius: "8px",
  border: `1px solid ${COLOR_PALETTE.lightGrey}`,
});

export const CartItemInfoStyle = css({
  display: "flex",
  alignItems: "center",

  gap: "24px",
});

export const CartItemNameStyle = css({
  fontSize: "12px",
  fontWeight: "500",
  textAlign: "left",

  marginBottom: "4px",
});

export const CartItemPriceStyle = css({
  fontSize: "24px",
  fontWeight: "700",
  textAlign: "left",

  marginBottom: "24px",
});

export const CartItemQuantityContainerStyle = css({
  display: "flex",
  gap: "4px",
});

export const CartItemQuantityStyle = css({
  textAlign: "center",
  minWidth: "24px",
});

export const OrderItemQuantityStyle = css({
  fontSize: "12px",
  fontWeight: "500",
});
