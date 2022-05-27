import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from 'redux/reducers';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const store = createStore(rootReducer);

export const decorators = [
  Story => (
    <Provider store={store}>
      <GlobalStyle />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <ErrorBoundary fallback={<ErrorPage>오류가 발생했습니다</ErrorPage>}>
            <Story />
          </ErrorBoundary>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  ),
];
