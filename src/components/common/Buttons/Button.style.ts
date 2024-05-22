import { css } from "@emotion/react";
import { COLOR_PALETTE } from "../../../colorPalette";
import { CSSProperties } from "react";

export const ButtonStyle = (
  width: CSSProperties["width"],
  height: CSSProperties["height"],
  fontSize: CSSProperties["fontSize"],
  fontWeight: CSSProperties["fontWeight"],
  border: CSSProperties["border"],
  isHighlight: boolean
) =>
  css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width,
    height,

    border,
    borderRadius: "4px",
    backgroundColor: isHighlight ? COLOR_PALETTE.black : COLOR_PALETTE.white,

    fontSize,
    fontWeight,
    overflow: "hidden",
    color: COLOR_PALETTE.textBlack,

    transition: "all 0.2s",

    "&:hover": {
      filter: "brightness(0.96)",
    },
  });
