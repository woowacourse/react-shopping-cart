import React from "react";
import styled from "styled-components";
import {
  ButtonRadiusVariant,
  ButtonSize,
  ButtonTheme,
  ButtonWidth,
} from "./Button.type";
import {
  BUTTON_RADIUS,
  BUTTON_SIZE,
  BUTTON_THEME,
  BUTTON_WIDTH,
} from "./Button.style";

export interface ButtonProps
  extends React.PropsWithChildren<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  > {
  theme?: ButtonTheme;
  size?: ButtonSize;
  width?: ButtonWidthProps;
  radiusVariant?: ButtonRadiusVariant;
}
type ButtonWidthProps = ButtonWidth | "fixed";

const Button = ({
  children,
  onClick,
  theme = "white",
  size = "medium",
  width = "full",
  radiusVariant = "square",
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      $theme={theme}
      $size={size}
      $width={width}
      $radiusVariant={radiusVariant}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{
  $theme: ButtonTheme;
  $size: ButtonSize;
  $width: ButtonWidthProps;
  $radiusVariant: ButtonRadiusVariant;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 0.5px solid #8b95a1;

  padding: 4px;

  ${({ $size }) => BUTTON_SIZE[$size]};
  ${({ $theme }) => BUTTON_THEME[$theme]};
  width: ${({ $width, $size }) =>
    $width === "fixed" ? BUTTON_WIDTH[$size] : BUTTON_WIDTH[$width]};
  border-radius: ${({ $radiusVariant }) => BUTTON_RADIUS[$radiusVariant]};

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.COLOR["grey-2"]};
    color: white;
    border: none;
  }
`;
