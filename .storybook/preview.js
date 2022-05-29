import GlobalStyle from 'GlobalStyle';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { BrowserRouter } from 'react-router-dom';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  Story => (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <Story />
      </BrowserRouter>
    </Provider>
  ),
];
