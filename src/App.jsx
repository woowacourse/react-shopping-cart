import { ThemeProvider } from "styled-components";
import { theme } from "./style";

import Header from "./components/Header";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    </div>
  );
}

export default App;
