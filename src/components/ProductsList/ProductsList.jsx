import React, { useEffect, useState } from "react";
import Product from "./Product/Product";
import * as S from "./ProductsList.styled";

const ProductsList = () => {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    const fetchProductsList = async () => {
      const res = await fetch(`${process.env.PUBLIC_URL}/data/data.json`);
      const { data } = await res.json();
      setProductsList(data);
    };

    fetchProductsList();
  }, []);

  return (
    <S.ProductsList>
      {productsList.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </S.ProductsList>
  );
};

export default ProductsList;
