import GlobalStyle from '../src/Global.style';
import StoryRouter from 'storybook-react-router';
import { Provider } from 'react-redux';
import store from '../src/states/store';

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
  StoryRouter(),
  (Story) => (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <Story />
      </Provider>
    </>
  ),
];
