import { css } from "@emotion/react";

export const OrderContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "32px",
});

export const ShippingOptionContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",

  gap: "16px",
});

export const ShippingOptionTitleStyle = css({
  fontSize: "16px",
  fontWeight: "700",
});

export const ShippingOptionCheckboxStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",

  "&>div": {
    fontSize: "12px",
    fontWeight: "500",
  },
});
