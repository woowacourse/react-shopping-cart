import { ThemeProvider } from "styled-components";
import NavButton from "./components/common/NavButton";
import { theme } from "./style";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <NavButton />
      </ThemeProvider>
    </div>
  );
}

export default App;
