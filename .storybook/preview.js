import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "../src/globalStyles";

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
    <BrowserRouter>
      <GlobalStyles />
      <Story />
    </BrowserRouter>
  ),
];
