import React from "react";
import { ProductCardList } from "../components/productCardList/ProductCardList";
import { Layout } from "../layout";
import { useMockData } from "../hooks/useMockData";

function Main() {
  const { products } = useMockData();

  return (
    <Layout>
      <ProductCardList products={products} />
    </Layout>
  );
}

export default Main;
