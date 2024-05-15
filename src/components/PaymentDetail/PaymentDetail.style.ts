import { css } from "@emotion/react";

export const PaymentDetailContainerStyle = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
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
