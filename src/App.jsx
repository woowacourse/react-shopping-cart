import { ThemeProvider } from "styled-components";
import { theme } from "./style";

import { Provider } from "react-redux";
import { productInfoListStore } from "./productInfoListStore";

import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Provider store={productInfoListStore}>
          <Header />
          <Main />
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
