import GlobalStyle from 'GlobalStyle';
import { Provider } from 'react-redux';
import { store } from 'store/store';

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
      <GlobalStyle />
      <Story />
    </Provider>
  ),
];
