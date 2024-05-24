import { css } from "@emotion/react";

export const ControlStyle = (isDisabled: boolean) =>
  css({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",

    gap: "8px",

    opacity: isDisabled ? 0.5 : 1,
  });
