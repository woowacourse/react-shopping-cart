import { css } from "@emotion/react";

export const PaymentDetailContainerStyle = (directionStyle: "row" | "column") =>
  css({
    display: "flex",
    flexDirection: directionStyle,
    justifyContent: directionStyle === "row" ? "space-between" : "center",
    alignItems: "center",
    textAlign: directionStyle === "column" ? "center" : "left",
  });

export const PaymentDetailTitleStyle = css({
  fontSize: "16px",
  fontWeight: "700",

  width: "40%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  textWrap: "nowrap",
});

export const PaymentDetailAmountStyle = css({
  fontSize: "24px",
  fontWeight: "700",
});
