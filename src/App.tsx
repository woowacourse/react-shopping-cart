import { HashRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './App.styles';
import GlobalStyle from './Global.styles';
import ProductListPage from './pages/ProductListPage/ProductListPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <ProductListPage />
          </Route>
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
