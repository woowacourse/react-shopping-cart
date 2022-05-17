import "styled-components";
import theme from "./theme";

declare module "styled-components" {
  export interface DefaultTheme extends theme {}

  export interface FlexWrapper {
    width?: string;
    height?: string;
    gap?: string;
    mt?: string;
    mb?: string;
    ml?: string;
    mr?: string;
    border?: string;
    bColor?: string;
    bt?: string;
    bb?: string;
    bl?: string;
    br?: string;
    padding?: string;
  }

  export interface StyledType {
    type?: string;
  }
}
