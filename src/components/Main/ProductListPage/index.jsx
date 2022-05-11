import React from "react";
import GridList from "./GridList";
import ProductCard from "./ProductCard";

const dummy = {
  thumbnail: "https://cdn-mart.baemin.com/goods/85/1537405626217m0.jpg",
  name: "PET보틀-정사각(420ml)",
  price: 43400,
};

function ProductListPage() {
  return (
    <GridList>
      <ProductCard productInfo={dummy} />
      <ProductCard productInfo={dummy} />
      <ProductCard productInfo={dummy} />
      <ProductCard productInfo={dummy} />
      <ProductCard productInfo={dummy} />
      <ProductCard productInfo={dummy} />
      <ProductCard productInfo={dummy} />
      <ProductCard productInfo={dummy} />
      <ProductCard productInfo={dummy} />
      <ProductCard productInfo={dummy} />
      <ProductCard productInfo={dummy} />
      <ProductCard productInfo={dummy} />
      <ProductCard productInfo={dummy} />
      <ProductCard productInfo={dummy} />
    </GridList>
  );
}

export default ProductListPage;
