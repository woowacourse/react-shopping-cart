import React from "react";
import styled from "styled-components";
import {
  ButtonPosition,
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
  position?: ButtonPosition;
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
  position = "center",
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
      $position={position}
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
  $position: ButtonPosition;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 0.5px solid #8b95a1;

  padding: 4px;

  ${({ $size }) => BUTTON_SIZE[$size]};

  ${({ $theme }) => BUTTON_THEME[$theme]};

  position: ${({ $position }) => ($position === "bottom" ? "fixed" : "auto")};
  bottom: ${({ $position }) => $position === "bottom" && 0};

  max-width: 430px;
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
