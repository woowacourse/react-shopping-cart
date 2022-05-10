import React from 'react';
import reset from 'styled-reset';
import {createGlobalStyle} from 'styled-components';
import Header from 'component/common/Header';

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
    <div className="App">
      <GlobalStyles />
      <Header />
    </div>
  );
}

export default App;
