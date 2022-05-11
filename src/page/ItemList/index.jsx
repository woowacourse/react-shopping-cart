import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GridWrapper from "../../components/GridWrapper";
import Item from "../../components/Item";
import { getProduct } from "../../modules/products";
import * as S from "./index.styles";

const ItemList = () => {
  const product = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <S.ItemListContainer>
      <GridWrapper>
        {product.loading ||
          product.data.map((product) => <Item key={product.id} {...product} />)}
      </GridWrapper>
    </S.ItemListContainer>
  );
};

export default ItemList;
