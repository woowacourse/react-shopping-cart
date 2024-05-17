import { ButtonHTMLAttributes } from "react";

type ButtonThemeType = "black" | "white" | "disabled";
type ButtonSizeType = "xs" | "s" | "m" | "full";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  $theme?: ButtonThemeType;
  $size?: ButtonSizeType;
  $borderRadius?: string;
}
