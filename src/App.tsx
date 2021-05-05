import { ThemeProvider } from 'styled-components';
import { theme } from './App.styles';
import GlobalStyle from './Global.styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="App"></div>
    </ThemeProvider>
  );
}

export default App;
