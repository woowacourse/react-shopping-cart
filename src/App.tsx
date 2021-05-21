import React, { ReactElement } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { SnackbarProvider } from 'notistack';
import { theme } from './App.styles';
import rootReducer from './modules';
import Routes from './Routes';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const App = (): ReactElement => {
  return (
    <Provider store={store}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        maxSnack={3}
      >
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </SnackbarProvider>
    </Provider>
  );
};

export default App;
