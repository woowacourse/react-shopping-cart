import { css } from "@emotion/react";
import { COLOR_PALETTE } from "../../colorPalette";

export const HeaderStyle = css({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",

  position: "fixed",
  top: "0",
  left: "0",

  width: "100%",
  height: "64px",
  padding: "0 24px",

  backgroundColor: COLOR_PALETTE.black,
  color: COLOR_PALETTE.white,

  fontSize: "20px",
  fontWeight: "800",
});
