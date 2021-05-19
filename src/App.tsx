import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Global, ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { SnackbarProvider } from 'notistack';
import BaseLayout from 'components/layout/BaseLayout/BaseLayout';
import Routes from 'Routes';
import rootReducer from 'modules';
import Styled, { globalStyle, theme } from './App.styles';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const App = () => {
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
              <Global styles={globalStyle} />
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
