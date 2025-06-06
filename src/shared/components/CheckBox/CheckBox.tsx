import { ComponentProps, PropsWithChildren } from "react";
import * as S from "./CheckBox.styled";

type CheckBoxProps = {
  isChecked: boolean;
} & ComponentProps<"button">;

const palette = {
  checked: {
    background: "#000000",
    check: "#FFFFFF",
    stroke: "#000000",
  },
  unchecked: {
    background: "#FFFFFF",
    check: "#E5E5E5",
    stroke: "#E5E5E5",
  },
};

export default function CheckBox({
  isChecked,
  children,
  ...rest
}: PropsWithChildren<CheckBoxProps>) {
  const checked = isChecked ? "checked" : "unchecked";

  return (
    <S.CheckBoxButton type="button" {...rest} name={checked}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="23"
          height="23"
          rx="7.5"
          fill={palette[checked].background}
          stroke={palette[checked].stroke}
        />
        <g clipPath="url(#clip0_876_282)">
          <path
            d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7.00003L19.59 5.59003L9 16.17Z"
            fill={palette[checked].check}
          />
        </g>
        <defs>
          <clipPath id="clip0_876_282">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
      {children}
    </S.CheckBoxButton>
  );
}
