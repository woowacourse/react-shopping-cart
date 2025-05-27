import { css } from "@emotion/react";

const buttonLayout = (
  backgroundColor: string,
  color: string,
  border: string = "none",
  size: "sm" | "full" = "sm",
  disabled: boolean
) => {
  const sizeVarient = {
    sm: {
      width: "fit-content",
      fontSize: "12px",
      padding: "4px",
    },
    full: {
      width: "100%",
      fontSize: "16px",
      padding: "12px",
    },
  };

  return css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${sizeVarient[size].padding};
    width: ${sizeVarient[size].width};
    border: ${border};

    background-color: ${backgroundColor};
    border-radius: 4px;
    color: ${color};

    font-weight: 600;
    font-family: "Noto Sans";
    font-size: ${sizeVarient[size].fontSize};
    text-align: center;
    white-space: nowrap;

    cursor: ${disabled ? "not-allowed" : "pointer"};
  `;
};

export { buttonLayout };
