import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import GlobalStyles from "../src/globalStyles";
import reducer from "../src/modules/products";

const store = createStore(reducer);

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
      <Provider store={store}>
        <GlobalStyles />
        <Story />
      </Provider>
    </BrowserRouter>
  ),
];
