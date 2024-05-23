import { css } from "@emotion/react";

export const CouponItemContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  marginBottom: "24px",

  gap: "12px",
});

export const CouponItemCheckboxContainerStyle = css({
  display: "flex",
  alignItems: "center",

  gap: "8px",
});

export const CouponItemCheckboxTitleStyle = css({
  fontSize: "16px",
  fontWeight: "700",
});

export const CouponItemInfoContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",

  gap: "4px",

  "&>div": {
    fontSize: "12px",
    fontWeight: "500",
  },
});
