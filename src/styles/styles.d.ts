import 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      white: string;
      primary: string;
      secondary: string;
      gray: string;
    };
    font: {
      header: string;
      small: string;
      medium: string;
      large: string;
    };
  }
}
