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
});

export const BackButtonStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  width: "30px",
  height: "30px",

  color: COLOR_PALETTE.white,
  backgroundColor: COLOR_PALETTE.black,
  borderRadius: "100%",

  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.2)",
  },
});

export const ShopButtonStyle = css({
  color: COLOR_PALETTE.white,

  fontSize: "20px",
  fontWeight: "800",
});
