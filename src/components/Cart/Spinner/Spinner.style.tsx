import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { colors, radius } from "../../../styles/theme";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
export const SpinnerElement = styled.div<{
  size: "small" | "medium" | "large";
}>`
  border-radius: ${radius.circle};
  animation: ${spin} 0.8s linear infinite;

  ${({ size }) => {
    switch (size) {
      case "small":
        return `
          width: 30px;
          height: 30px;
          border: 3px solid ${colors.overlayLight};
        `;
      case "medium":
        return `
          width: 50px;
          height: 50px;
          border: 5px solid ${colors.overlayLight};
        `;
      case "large":
        return `
          width: 70px;
          height: 70px;
          border: 7px solid ${colors.overlayLight};
        `;
      default:
        return `
          width: 50px;
          height: 50px;
          border: 5px solid ${colors.overlayLight};
        `;
    }
  }}

  border-top-color: ${colors.blue};
`;
