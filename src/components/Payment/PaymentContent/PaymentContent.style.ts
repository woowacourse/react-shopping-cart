import { css } from "@emotion/react";

export const PaymentContentStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  height: "calc(100vh - 128px)",

  margin: "64px 0",
  padding: "36px 24px",

  gap: "24px",

  "&>div": {
    width: "100%",
  },
});

export const PaymentTitleStyle = css({
  fontSize: "24px",
  fontWeight: "700",
  textAlign: "left",

  marginBottom: "12px",
});

export const OrderDescriptionStyle = css({
  fontSize: "12px",
  fontWeight: "500",
  textAlign: "center",
  whiteSpace: "pre-line",
});
