import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Item from "../Item";
import ItemSkeleton from "../ItemSkeleton";

const LOAD_ITEM_AMOUNT = 10;

const Items = () => {
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();
  const handleItemClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      {products.data.map((product) => (
        <Item
          key={product.id}
          {...product}
          onClick={() => {
            handleItemClick(product.id);
          }}
        />
      ))}
      {products.loading &&
        Array.from({ length: LOAD_ITEM_AMOUNT }).map((_, index) => (
          <ItemSkeleton key={`skeleton-${index}`} />
        ))}
    </>
  );
};

export default Items;
