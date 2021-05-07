import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    bgColor: {
      primary: string;
    };

    color: {
      defaultBlack: string;
    };

    textColor: {
      defaultWhite: string;
    };

    borderColor: {
      darkGrey: string;
      lightGrey: string;
    };
  }
}
