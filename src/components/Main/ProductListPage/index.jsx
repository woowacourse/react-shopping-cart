import React from "react";
import GridList from "./GridList";
import ProductCard from "./ProductCard";

import dummyData from "../../../data.json";

const { products: productInfoList } = dummyData;

function ProductListPage() {
  return (
    <GridList>
      {productInfoList.map((productInfo) => (
        <ProductCard key={productInfo.id} productInfo={productInfo} />
      ))}
    </GridList>
  );
}

export default ProductListPage;
