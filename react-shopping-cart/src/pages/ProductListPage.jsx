import styled from "styled-components";
import { useState, useEffect } from "react";
import ProductCard from "../component/ProductCard/ProductCard";

const GridContainer = styled.div`
  display: grid;
  width: 70%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 22px;
  justify-content: center;
`;

function ProductListPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const res = await fetch("http://localhost:3002/products");
      if (res.ok) {
        setData(await res.json());
      }
    };
    callApi();
  }, []);

  return (
    <GridContainer>
      {data.map(({ id, name, image, price }) => (
        <ProductCard key={id} name={name} thumbnail={image} price={price} />
      ))}
    </GridContainer>
  );
}

export default ProductListPage;
