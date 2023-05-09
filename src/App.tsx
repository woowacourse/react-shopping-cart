import React from "react";
import Main from "./pages/Main";
import { RecoilRoot } from "recoil";


const App = () => {
  return (
    <RecoilRoot>
      <Main />
    </RecoilRoot>
  );
};

export default App;
