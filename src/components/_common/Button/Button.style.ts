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
    height: 48px;
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
  `,
  large: css`
    height: 64px;
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
  `,
};

export const BUTTON_WIDTH: Record<
  ButtonWidth | ButtonSize,
  CSSProperties["width"]
> = {
  small: "60px",
  medium: "80px",
  large: "120px",
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

    color: ${({ theme }) => theme.COLOR["grey-3"]};
    opacity: 0.75;

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

export const BUTTON_RADIUS: Record<
  ButtonRadiusVariant,
  CSSProperties["borderRadius"]
> = {
  square: "0px",
  rounded: "4px",
  floating: "24px",
};
