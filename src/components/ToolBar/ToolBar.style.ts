import { css } from "@emotion/react";

export const ControlStyle = (disabled: boolean) =>
  css({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",

    gap: "8px",

    opacity: disabled ? 0.5 : 1,
  });
