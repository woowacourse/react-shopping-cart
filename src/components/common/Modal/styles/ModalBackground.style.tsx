import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { colors } from "../../../../styles/theme";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ModalBackground = styled.div<{
  position?: "center" | "bottom";
}>`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${colors.overlayLight};
  animation: ${fadeIn} 0.3s ease-in-out;
  justify-content: center;
  align-items: ${(props) => (props.position === "center" ? "center" : "end")};
`;
