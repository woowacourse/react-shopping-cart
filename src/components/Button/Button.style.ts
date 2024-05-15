import { css } from "@emotion/react";
import { COLOR_PALETTE } from "../../colorPalette";

export const ButtonStyle = (width: string, height: string, fontSize: string, isHighlight: boolean) =>
  css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width,
    height,

    border: `1px solid ${COLOR_PALETTE.lightGrey}`,
    borderRadius: "4px",
    backgroundColor: isHighlight ? COLOR_PALETTE.black : COLOR_PALETTE.white,

    fontSize,
    overflow: "hidden",

    transition: "all 0.2s",

    "&:hover": {
      filter: "brightness(0.96)",
    },
  });
