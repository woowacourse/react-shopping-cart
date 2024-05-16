import { Theme } from "@emotion/react";

interface Colors {
  white: string;
  semiBlack: string;
  gray: string;
  black: string;
  border: string;
  text: string;
  divider: string;
}

interface Spacer {
  spacing1: string;
  spacing2: string;
  spacing3: string;
  spacing4: string;
  spacing5: string;
  spacing6: string;
}

interface BorderRadius {
  small: string;
  medium: string;
}

declare module "@emotion/react" {
  export interface Theme {
    colors: Colors;
    borderRadius: BorderRadius;
    spacer: Spacer;
  }
}

const colors: Colors = {
  white: "white",
  semiBlack: "#0000001A",
  black: "#000000",
  border: "#eaeaea",
  gray: "#BEBEBE",
  text: "#0A0D13",
  divider: "#0000001A",
};

const spacer: Spacer = {
  spacing1: "4px",
  spacing2: "8px",
  spacing3: "16px",
  spacing4: "24px",
  spacing5: "32px",
  spacing6: "64px",
};

const borderRadius: BorderRadius = {
  small: "4px",
  medium: "8px",
};

const theme: Theme = {
  colors,
  spacer,
  borderRadius,
};

export default theme;
