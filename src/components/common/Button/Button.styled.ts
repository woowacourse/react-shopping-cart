import styled from "@emotion/styled";
import { ButtonStyleProps } from "./type";

export const Button = styled.button<{ styles: ButtonStyleProps }>`
  ${(props) => selectVariant(props.styles.variant)}
  ${(props) => selectSize(props.styles.size)}
`;

const selectVariant = (variant: ButtonStyleProps["variant"]) => {
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
        border-radius: 4px;
      `;
    case "disabled":
      return `
        background-color: #BEBEBE;
        color: #fff;
        cursor:not-allowed;
      `;
  }
};

const selectSize = (size: ButtonStyleProps["size"]) => {
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
