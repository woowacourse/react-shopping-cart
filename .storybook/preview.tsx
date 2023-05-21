import type { Preview } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import GlobalStyle from "../src/style/GlobalStyle";
import { RecoilRoot } from "recoil";
import { initializeWorker, mswDecorator } from "msw-storybook-addon";

initializeWorker();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const decorators = [
  mswDecorator,
  (Story) => (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </RecoilRoot>
    </>
  ),
];

export default preview;
