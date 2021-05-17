import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    bgColor: {
      primary: string;
      secondary: string;
      lightGrey: string;
      darkBrown: string;
    };

    color: {
      defaultBlack: string;
    };

    textColor: {
      defaultWhite: string;
      defaultGrey: string;
    };

    borderColor: {
      darkGrey: string;
      defaultGrey: string;
      lightGrey: string;
    };
  }
}
