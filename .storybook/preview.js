import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../src/store";
import GlobalStyles from "../src/GlobalStyles";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <>
      <Provider store={store}>
        <MemoryRouter>
          <GlobalStyles />
          <Story />
        </MemoryRouter>
      </Provider>
    </>
  ),
];
