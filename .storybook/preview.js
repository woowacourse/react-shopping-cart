import React from "react";
import GlobalStyle from "../src/GlobalStyle";
import { RecoilRoot } from "recoil";

export const decorators = [
  (Story) => (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    </>
  ),
];
