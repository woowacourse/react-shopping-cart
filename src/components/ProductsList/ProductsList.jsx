import React, { useEffect, useState } from "react";
import { productAPI } from "../../utils/api";
import Product from "./Product/Product";
import * as S from "./ProductsList.styled";

const ProductsList = () => {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    const fetchProductsList = async () => {
      try {
        const list = await productAPI.fetch();

        setProductsList(list);
      } catch (error) {
        setProductsList([]);

        console.error(error);
      }
    };

    fetchProductsList();
  }, []);

  return (
    <S.ProductsList>
      {productsList.map((product) => (
        <Product key={product.productId} product={product} />
      ))}
    </S.ProductsList>
  );
};

export default ProductsList;
