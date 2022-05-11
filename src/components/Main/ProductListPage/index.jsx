import React from "react";
import { useSelector } from "react-redux";

import GridList from "./GridList";
import ProductCard from "./ProductCard";

function ProductListPage() {
  const productInfoList = useSelector((state) => state);

  return (
    <>
      {productInfoList.length === 0 ? (
        <h2>😱 텅 비었어요~~ 😱</h2>
      ) : (
        <GridList>
          {productInfoList.map((productInfo) => (
            <ProductCard key={productInfo.id} productInfo={productInfo} />
          ))}
        </GridList>
      )}
    </>
  );
}

export default ProductListPage;
