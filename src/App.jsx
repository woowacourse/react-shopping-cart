import React from "react";

import Header from "@/components/header/Header";
import ContentWrapper from "@/components/wrapper/Wrapper.styled";
import ProductList from "@/pages/home/components/product-list/ProductList";

function App() {
  return (
    <>
      <Header />
      <ContentWrapper>
        <ProductList />
      </ContentWrapper>
    </>
  );
}

export default App;
