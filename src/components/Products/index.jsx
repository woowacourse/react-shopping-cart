import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Product from "../Product";
import ProductSkeleton from "../ProductSkeleton";
import { LOAD_ITEM_AMOUNT } from "../../constants/constants";
import { useTheme } from "@emotion/react";

const Products = () => {
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();
  const theme = useTheme();
  const handleItemClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      {products.data.map((product) => (
        <Product
          key={product.id}
          {...product}
          shoppingCartColor={theme.color.black}
          onClick={() => {
            handleItemClick(product.id);
          }}
        />
      ))}
      {products.loading &&
        Array.from({ length: LOAD_ITEM_AMOUNT }).map((_, index) => (
          <ProductSkeleton key={`skeleton-${index}`} />
        ))}
    </>
  );
};

export default Products;
