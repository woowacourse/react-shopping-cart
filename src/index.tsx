import ReactDOM from "react-dom/client";
import store from "./redux/store";
import { Provider } from "react-redux";

import { createGlobalStyle, ThemeProvider } from "styled-components";
import App from "./App";
import theme from "./theme";

const GlobalStyle = createGlobalStyle`
  body{  
     margin: 0; 
   }   
`;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </ThemeProvider>
);
