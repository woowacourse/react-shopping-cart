/** @jsxImportSource @emotion/react */

import { SerializedStyles, useTheme } from "@emotion/react";
import { themeType } from "../../../ThemeProvider";
import * as S from "./index.styles";

interface ButtonProps {
  children?: React.ReactNode;
  size?: typeof S.ButtonSize[keyof typeof S.ButtonSize];
  css?: SerializedStyles;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  alt?: string;
  icon?: string;
  color?: string;
}

const Button = ({
  children,
  size = "MEDIUM",
  alt,
  icon,
  css,
  onClick,
  type = "button",
  disabled = false,
  color,
}: ButtonProps) => {
  const {
    color: { primary, gray },
  } = useTheme() as themeType;
  console.log(disabled);
  return (
    <S.Container
      size={size}
      css={css}
      onClick={onClick}
      type={type}
      disabled={disabled}
      buttonColor={color}
      primaryColor={primary}
      disabledColor={gray}
    >
      {icon && <S.Icon src={icon} alt={alt} size={size} hasText={!!children} />}
      {children}
    </S.Container>
  );
};

export default Button;
