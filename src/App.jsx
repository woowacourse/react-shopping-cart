import React from 'react'

import Header from "./components/header/Header";
import SS from "./components/styled";
import ProductList from "./pages/home/components/product-list/ProductList";

function App() {
  return (
    <>
      <Header />
      <SS.Wrapper>
        <ProductList /> 
      </SS.Wrapper>
    </>
  );
}

export default App;
