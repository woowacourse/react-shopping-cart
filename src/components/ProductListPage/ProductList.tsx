import { useRecoilValue } from "recoil";
import styled from "styled-components";

import ProductItem from "./ProductItem";
import { productData } from "../../atoms/productState";

export default function ProductList() {
  const products = useRecoilValue(productData);
  console.log(products);

  return (
    <ProductListContainer>
      {products.map((product: any) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </ProductListContainer>
  );
}

const ProductListContainer = styled.ul`
  display: grid;
  padding: 6rem;
  grid-template-columns: repeat(4, 28.2rem);

  gap: 4rem;

  @media only screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (max-width: 840px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
