import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles, theme } from 'components';
import store from 'store/store';
import { doInitializeCart } from 'actions/actionCreator';
import { dummyProductList } from 'dummy_data';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
  },
};

export const decorators = [
  (Story, context) => {
    store.dispatch(doInitializeCart({ products: dummyProductList }));

    return (
      <>
        <BrowserRouter>
          <GlobalStyles />
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <Story {...context} />
            </Provider>
          </ThemeProvider>
        </BrowserRouter>
      </>
    );
  },
];
