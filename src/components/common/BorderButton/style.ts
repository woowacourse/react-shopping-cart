import styled from "@emotion/styled";

export type SizeType = "small" | "large";

interface BorderButtonContainerProps {
  size?: SizeType;
}

export const BorderButtonContainer = styled.button<BorderButtonContainerProps>(
  ({ theme, size = "large" }) => ({
    background: "none",
    border: `1px solid ${theme.colors.border}`,
    borderRadius: `${theme.borderRadius.medium}`,

    width: size === "small" ? "24px" : "40px",
    height: size === "small" ? "24px" : "",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "12px",
    padding: 0,

    img: {
      width: size === "small" ? "12px" : "16px",
    },
  })
);
