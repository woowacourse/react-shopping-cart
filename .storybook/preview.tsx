import React from "react";
import { RecoilRoot } from "recoil";
import GlobalStyle from "../src/GlobalStyle";
import type { Preview, Meta } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#000",
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <RecoilRoot>
        <GlobalStyle />
        <Story />
      </RecoilRoot>
    ),
  ],
} satisfies Meta;

export default preview;
