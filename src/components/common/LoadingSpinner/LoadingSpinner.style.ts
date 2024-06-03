/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

export const rotate4 = keyframes`
  0% {
    stroke-dasharray: '1, 200';
    stroke-dashoffset: '0';
  }

  50% {
    stroke-dasharray: '90, 200';
    stroke-dashoffset: '-35px';
  }

  100% {
    stroke-dashoffset: '-125px';
  }
`;

export const dash4 = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dashoffset: -125px;
  }
`;

export const LoadingPageStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  height: "100%",
  backgroundColor: "inherit",

  margin: "64px 0",
});

export const LoadingSpinnerContainerStyle = css({
  width: "5em",
  transformOrigin: "center",
  animation: `${rotate4} 2s linear infinite`,

  "&>circle": {
    fill: "none",
    stroke: "hsl(214, 97%, 59%)",
    strokeWidth: "2",
    strokeDasharray: "1, 200",
    strokeDashoffset: "0",
    strokeLinecap: "round",
    animation: `${dash4} 1.5s ease-in-out infinite`,
  },
});
