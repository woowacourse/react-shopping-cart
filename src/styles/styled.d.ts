import { ColorType } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {
    colors: ColorType;
  }
}
