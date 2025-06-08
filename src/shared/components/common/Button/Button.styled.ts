import styled from "@emotion/styled";
import { ButtonSize, ButtonVariant } from "./type";

export const Button = styled.button<{ variant: ButtonVariant; size: ButtonSize }>`
  ${(props) => selectVariant(props.variant)}
  ${(props) => selectSize(props.size)}
  border-radius: 4px;
`;

const selectVariant = (variant: ButtonVariant) => {
  switch (variant) {
    case "primary":
      return `
        background-color: #333;
        color: #fff;
      `;
    case "secondary":
      return `
        background-color: #fff;
        color: #000;
        border: 1px solid rgba(0, 0, 0, 0.1);
      `;
    case "disabled":
      return `
        background-color: #BEBEBE;
        color: #fff;
        cursor:not-allowed;
      `;
  }
};

const selectSize = (size: ButtonSize) => {
  switch (size) {
    case "full":
      return `
        width: 100%;
        padding: 13px 0px;
        font-size: 15px;
      `;
    case "auto":
      return `
      width:auto;
        padding: 4px 8px;
        font-size: 12px;
      `;
  }
};
