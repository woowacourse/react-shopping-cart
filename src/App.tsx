import React, { FC } from "react";
import { BrowserRouter } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Header from "./Components/Header";

const App: FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
    </BrowserRouter>
  );
};

export default App;
