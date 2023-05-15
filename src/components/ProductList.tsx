import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { productsState } from "../recoil/atom";
import type { ProductListType } from "../types/domain";
import Product from "./Product";

const ProductList = () => {
  const products = useRecoilValue<ProductListType>(productsState);

  return (
    <Wrapper>
      {products.map((product) => (
        <Product key={crypto.randomUUID()} {...product} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(4, 1fr);

  width: 100%;
  grid-gap: 60px 20px;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default ProductList;
