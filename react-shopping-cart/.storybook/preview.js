import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from 'reducers';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const store = createStore(rootReducer, applyMiddleware(thunk));

export const decorators = [
  Story => (
    <Provider store={store}>
      <GlobalStyle />
      <MemoryRouter initialEntries={['/product/detail/1']}>
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  ),
];
