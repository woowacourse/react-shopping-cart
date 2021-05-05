import React, { VFC } from "react";
import { BrowserRouter } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Header from "./Components/Header";

const App: VFC = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
    </BrowserRouter>
  );
};

export default App;
