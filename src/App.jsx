import { ThemeProvider } from "styled-components";
import { theme } from "./style";

import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
        <Main />
      </ThemeProvider>
    </div>
  );
}

export default App;
