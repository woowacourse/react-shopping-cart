import { CSSProperties, RuleSet, css } from "styled-components";
import {
  ButtonRadiusVariant,
  ButtonSize,
  ButtonTheme,
  ButtonWidth,
} from "./Button.type";

export const BUTTON_SIZE: Record<ButtonSize, RuleSet<object>> = {
  small: css`
    height: 24px;
    line-height: 16px;
    font-size: 12px;
  `,
  medium: css`
    height: 36px;
    line-height: 18px;
    font-size: 14px;
  `,
  large: css`
    height: 44px;
    line-height: 22px;
    font-size: 18px;
  `,
  xLarge: css`
    height: 64px;
    line-height: 28px;
    font-size: 24px;
  `,
};

export const BUTTON_WIDTH: Record<
  ButtonWidth | ButtonSize,
  CSSProperties["width"]
> = {
  small: "60px",
  medium: "80px",
  large: "120px",
  xLarge: "160px",
  full: "100%",
  fit: "fit-content",
};

export const BUTTON_THEME: Record<ButtonTheme, RuleSet<object>> = {
  dark: css`
    background-color: #000000;

    color: #ffffff;

    &:hover {
      background-color: #1f1f1f;
    }

    &:disabled {
      background-color: #555555;
      color: #aaaaaa;
    }
  `,

  white: css`
    background-color: #ffffff;

    color: #8b95a1;

    &:hover {
      border: 0.5px solid #dfdfdf;
      background-color: #f0f0f0;
    }

    &:disabled {
      background-color: #eeeeee;
      color: #cccccc;
      border: 0.5px solid #cccccc;
    }
  `,
};

// export type ButtonRadiusVariant = "square" | "rounded" | "floating";

export const BUTTON_RADIUS: Record<
  ButtonRadiusVariant,
  CSSProperties["borderRadius"]
> = {
  square: "0px",
  rounded: "4px",
  floating: "24px",
};
