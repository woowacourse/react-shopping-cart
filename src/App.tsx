import React, { ReactElement } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { SnackbarProvider } from 'notistack';
import Styled, { theme } from './App.styles';
import rootReducer from './modules';
import Routes from './Routes';
import BaseLayout from './components/layout/BaseLayout/BaseLayout';

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
          <Router>
            <BaseLayout>
              <Styled.Page>
                <Routes />
              </Styled.Page>
            </BaseLayout>
          </Router>
        </ThemeProvider>
      </SnackbarProvider>
    </Provider>
  );
};

export default App;
