import styled from "styled-components";
import { ProductCard } from "./ProductCard";
import { useMockData } from "../../hooks/useMockData";

export const ProductCardList = () => {
  const { products } = useMockData();

  return (
    <Style.Container>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Style.Container>
  );
};

const Style = {
  Container: styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 300px);
    justify-items: center;
    column-gap: 47px;
    row-gap: 86px;

    @media screen and (max-width: 1320px) {
      grid-template-columns: repeat(3, 300px);
    }

    @media screen and (max-width: 1000px) {
      grid-template-columns: repeat(2);
    }

    @media screen and (max-width: 700px) {
      grid-template-columns: repeat(2, 150px);
      row-gap: 90px;
    }
  `,
};
