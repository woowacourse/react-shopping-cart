import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    bgColor: {
      primary: string;
    };
    textColor: {
      defaultWhite: string;
      defaultBlack: string;
    };
  }
}
