import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    [key: string]: {
      [key: string]: string | { [key: string]: string };
    };
  }
}
