import { css } from "@emotion/react";
import { COLOR_PALETTE } from "../../colorPalette";

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

export const CouponItemCheckboxTitleStyle = (isDisabled: boolean) =>
  css({
    fontSize: "16px",
    fontWeight: "700",

    color: isDisabled ? COLOR_PALETTE.disabledTitle : "",
  });

export const CouponItemInfoContainerStyle = (isDisabled: boolean) =>
  css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",

    gap: "4px",

    "&>*": {
      color: isDisabled ? COLOR_PALETTE.disabledSubtitle : "",
    },

    "&>div": {
      fontSize: "12px",
      fontWeight: "500",
    },
  });
