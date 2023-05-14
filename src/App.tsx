import React from "react";
import { RecoilRoot } from "recoil";
import { PageRouterProvider } from "./router";

const App = () => {
  return (
    <RecoilRoot>
      <PageRouterProvider />
    </RecoilRoot>
  );
};

export default App;
