import styled, { css } from "styled-components";

const textStyles = {
  small: css`
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
  `,
  medium: css`
    font-size: 16px;
    font-weight: 700;
    line-height: 16px;
  `,
  large: css`
    font-size: 24px;
    font-weight: 700;
    line-height: 34.75px;
  `,
};

export const Wrapper = styled.span<{ size: "small" | "medium" | "large" }>`
  ${({ size }) => textStyles[size || "medium"]}
`;
