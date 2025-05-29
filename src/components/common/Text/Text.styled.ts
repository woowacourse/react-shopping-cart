import styled from "@emotion/styled";
import { TextVariant } from "./type";

export const Text = styled.span<{ variant: TextVariant; color: string }>`
  font-style: normal;
  line-height: normal;

  ${(props) => selectVariant(props.variant)}
  color: ${(props) => props.color};
`;

export const selectVariant = (variant: TextVariant) => {
  switch (variant) {
    case "title-1":
      return `
        font-size: 24px;
        font-weight: 700;
      `;
    case "title-2":
      return `
        font-size: 16px;
        font-weight: 700;
      `;
    case "body-1":
      return `
        font-size: 16px;
        font-weight: 400;
      `;
    case "body-2":
      return `
        font-size: 14px;
        font-weight: 500;
      `;
    case "body-3":
      return `
        font-size: 12px;
        font-weight: 500;
      `;
  }
};
