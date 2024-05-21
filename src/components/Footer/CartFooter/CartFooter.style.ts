import { css } from "@emotion/react";
import { COLOR_PALETTE } from "../../../colorPalette";

export const CartFooterStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  position: "fixed",
  bottom: "0",
  left: "0",

  width: "100%",
  height: "64px",

  backgroundColor: COLOR_PALETTE.black,
  color: COLOR_PALETTE.white,

  fontSize: "16px",
  fontWeight: "700",

  "&:disabled": {
    backgroundColor: COLOR_PALETTE.normalGrey,
    cursor: "default",
  },
});
