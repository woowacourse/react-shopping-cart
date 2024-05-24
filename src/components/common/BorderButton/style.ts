import styled from "@emotion/styled";

export type SizeType = "small" | "large" | "full";

const getWidthSize = (size: SizeType) => {
  switch (size) {
    case "small": {
      return "24px";
    }
    case "large": {
      return "40px";
    }
    case "full": {
      return "100%";
    }
    default: {
      return "24px";
    }
  }
};

const getPadding = (size: SizeType) => {
  switch (size) {
    case "small": {
      return "0";
    }
    case "large": {
      return "0";
    }
    case "full": {
      return "12px";
    }
    default: {
      return "0";
    }
  }
};

interface BorderButtonContainerProps {
  size?: SizeType;
  bgColor?: string;
  color: string;
}

export const BorderButtonContainer = styled.button<BorderButtonContainerProps>(
  ({ theme, size = "large", bgColor = "none", color }) => ({
    background: `${bgColor}`,
    border: bgColor !== "none" ? `1px solid ${theme.colors.border}` : "none",
    borderRadius: `${theme.borderRadius.medium}`,

    color: color,
    width: getWidthSize(size),
    height: size === "small" ? "24px" : "",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "12px",
    padding: getPadding(size),

    img: {
      width: size === "small" ? "12px" : "16px",
    },
  })
);
