import { css } from "@emotion/react";

export const PaymentDetailContainerStyle = (directionStyle: "row" | "column") =>
  css({
    display: "flex",
    flexDirection: directionStyle,
    justifyContent: directionStyle === "row" ? "space-between" : "center",
    alignItems: "center",
    textAlign: directionStyle === "column" ? "center" : "left",

    gap: "12px",
  });

export const PaymentDetailTitleStyle = css({
  fontSize: "16px",
  fontWeight: "700",

  overflow: "hidden",
  textOverflow: "ellipsis",
  textWrap: "nowrap",
});

export const PaymentDetailAmountStyle = css({
  fontSize: "24px",
  fontWeight: "700",
});
