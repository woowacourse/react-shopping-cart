import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    brandColor_1: string;

    mobile: string;
    tablet: string;
    desktop: string;

    innerWidth: string;
    minWidth: string;

    blackColor_1: string;
    blackColor_2: string;

    greyColor_1: string;
    greyColor_2: string;
    greyColor_3: string;

    brownColor_1: string;

    whiteColor_1: string;

    redColor_1: string;
  }

  export interface StyleProps {
    width: string;
    height: string;
    backgroundColor: string;
    fontColor: string;
    fontSize: string;
    padding: string;
    border: string;
    aspectRatio: string;

    position: string;
    top: string;
    bottom: string;
    left: string;
    right: string;
  }
}
