import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GridWrapper from "../../components/GridWrapper";
import Item from "../../components/Item";
import { getProduct } from "../../modules/products";

const ItemList = () => {
  const product = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const handleItemClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <section>
      <GridWrapper>
        {product.loading ||
          product.data.map((product) => (
            <Item
              key={product.id}
              {...product}
              onClick={() => {
                handleItemClick(product.id);
              }}
            />
          ))}
      </GridWrapper>
    </section>
  );
};

export default ItemList;
