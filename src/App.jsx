import React from 'react';
import reset from 'styled-reset';
import {createGlobalStyle, ThemeProvider} from 'styled-components';
import Header from 'component/common/Header';
import theme from 'theme/theme';

export const GlobalStyles = createGlobalStyle`
  ${reset}
  a {
    color: inherit;
    text-decoration: none;
  }
  input, button {
    background-color: transparent;
    border: none;
    outline: none;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyles />
        <Header />
        <div>한글</div>
      </div>
    </ThemeProvider>
  );
}

export default App;
