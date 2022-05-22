import React from "react";

import Header from "@/components/header/Header";
import ContentWrapper from "@/components/wrapper/Wrapper.styled";
import ProductList from "@/pages/home/components/product-list/ProductList";
import Cart from "./pages/cart/components/cart/Cart";
import Footer from "./pages/home/components/footer/Footer";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

function App() {
  return (
    <>
      <Header />
      <ContentWrapper>
        <ProductList />
        {/* <Cart /> */}
      </ContentWrapper>
      <Footer />
    </>
  );
}

export default App;
