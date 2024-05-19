import React from "react";

import {
  ButtonRadiusVariant,
  ButtonSize,
  ButtonTheme,
  ButtonWidth,
} from "./Button.type";

import Styled from "./Button.style";

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
    <Styled.Button
      $theme={theme}
      $size={size}
      $width={width}
      $radiusVariant={radiusVariant}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </Styled.Button>
  );
};

export default Button;
