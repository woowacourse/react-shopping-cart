import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Global, ThemeProvider } from '@emotion/react';
import { SnackbarProvider } from 'notistack';
import { render } from '@testing-library/react';
import rootReducer from './modules';
import { globalStyle, theme } from './App.styles';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// eslint-disable-next-line react/prop-types
const AllTheProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        maxSnack={3}
      >
        <Global styles={globalStyle} />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </SnackbarProvider>
    </Provider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
