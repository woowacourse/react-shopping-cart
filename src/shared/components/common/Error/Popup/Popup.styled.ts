import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 430px;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 64px;
  left: 0;
  text-align: center;
  color: #000;
  background-color: #ffc9c9;
  padding: 12px 0;
  animation: ${slideDown} 0.3s ease-out;
`;
