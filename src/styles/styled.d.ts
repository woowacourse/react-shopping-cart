import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    typography: {
      heading: string;
      pageTitle: string;
      label: string;
      price: string;
      boldLabel: string;
      labelTitle: string;
    };
    color: {
      black: string;
      white: string;
      lightGray: string;
      black10: string;
    };
  }
}
