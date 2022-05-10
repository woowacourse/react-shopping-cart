import { ThemeProvider } from 'styled-components';

import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

import Header from './components/Layout/Header/Header';
import Logo from './components/Logo/Logo';

function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header>
            <Logo></Logo>
          </Header>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
