import React from "react";
import styled from "styled-components";
import GridList from "../GridList";
import ProductCard from "../ProductCard";

const dummy = {
  thumbnail: "https://cdn-mart.baemin.com/goods/85/1537405626217m0.jpg",
  name: "PET보틀-정사각(420ml)",
  price: 43400,
};

const Container = styled.main`
  max-width: 1320px;
  margin: 140px auto 60px;

  height: calc(100vh - 200px);
`;

function Main() {
  return (
    <Container>
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
    </Container>
  );
}

export default Main;
