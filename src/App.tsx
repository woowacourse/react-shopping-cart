import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Global, ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { store } from 'modules/store';
import BaseLayout from 'components/layout/BaseLayout/BaseLayout';
import Routes from 'Routes';
import Styled, { globalStyle, theme } from './App.styles';

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
