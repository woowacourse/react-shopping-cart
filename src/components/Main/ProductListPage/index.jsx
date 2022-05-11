import React from "react";
import { useSelector } from "react-redux";

import GridList from "./GridList";
import ProductCard from "./ProductCard";

function ProductListPage() {
  const productInfoList = useSelector((state) => state);

  return (
    <GridList>
      {productInfoList.map((productInfo) => (
        <ProductCard key={productInfo.id} productInfo={productInfo} />
      ))}
    </GridList>
  );
}

export default ProductListPage;
