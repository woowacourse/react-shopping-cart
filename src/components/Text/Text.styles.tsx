import styled from "@emotion/styled";
import { TextVariant } from "./Text";

export const Text = styled.p<{ variant: TextVariant; color: string }>`
  font-style: normal;
  line-height: normal;
  color: ${({ color }) => color};
  ${({ variant }) => {
    switch (variant) {
      case "title-1":
        return `font-size: 24px; font-weight: 700;`;
      case "title-2":
        return `font-size:16px; font-weight: 700;`;
      case "title-3":
        return `font-size: 12px; font-weight: 700;`;
      case "body-0":
        return `font-size: 24px; font-weight: 300;`;
      case "body-1":
        return `font-size: 14px; font-weight: 300;`;
      case "body-2":
        return `font-size: 12px; font-weight: 300;`;
      case "body-3":
        return `font-size: 10px; font-weight: 300;`;
      default:
        return "";
    }
  }}
`;
