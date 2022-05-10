import React from "react";
import { useSelector } from "react-redux";
import GridWrapper from "../../components/GridWrapper";
import Item from "../../components/Item";
import * as S from "./index.styles";

const ItemList = () => {
  const products = useSelector((state) => state.products);
  return (
    <S.ItemListContainer>
      <GridWrapper>
        {products.map((product) => (
          <Item key={product.id} {...product} />
        ))}
      </GridWrapper>
    </S.ItemListContainer>
  );
};

export default ItemList;
