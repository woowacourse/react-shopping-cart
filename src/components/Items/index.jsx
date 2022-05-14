import React from "react";
import { useNavigate } from "react-router-dom";
import Item from "../Item";
import ItemSkeleton from "../ItemSkeleton";
import { v4 as uuidv4 } from "uuid";

const LOAD_ITEM_AMOUNT = 10;

const Items = ({ products: { data, loading } }) => {
  const navigate = useNavigate();
  const handleItemClick = (id) => {
    navigate(`/product/${id}`);
  };

  if (loading) {
    return Array.from({ length: LOAD_ITEM_AMOUNT }).map(() => (
      <ItemSkeleton key={uuidv4()} />
    ));
  }

  return (
    <>
      {data.map((product) => (
        <Item
          key={product.id}
          {...product}
          onClick={() => {
            handleItemClick(product.id);
          }}
        />
      ))}
    </>
  );
};

export default Items;
