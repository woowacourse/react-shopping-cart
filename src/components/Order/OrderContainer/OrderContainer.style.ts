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

export const CouponModalContainerStyle = css({
  maxHeight: "70vh",
  overflow: "auto",
});

export const CouponGuideContainerStyle = css({
  display: "flex",
  alignItems: "center",

  gap: "4px",
  margin: "17px 0",
});

export const CouponGuideStyle = css({
  fontSize: "12px",
  fontWeight: "500",
});
