import { ButtonHTMLAttributes, ReactNode } from "react";
import { Interpolation, Theme } from "@emotion/react";

interface CommonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  cssStyle: Interpolation<Theme>;
}

export default function Button({
  children,
  cssStyle,
  ...props
}: CommonButtonProps) {
  return (
    <button css={cssStyle} {...props}>
      {children}
    </button>
  );
}
