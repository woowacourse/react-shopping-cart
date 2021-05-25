import React, { ReactElement } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import Styled, { theme } from './App.styles';
import { store } from './store';
import Routes from './Routes';
import BaseLayout from './components/layout/BaseLayout/BaseLayout';

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
