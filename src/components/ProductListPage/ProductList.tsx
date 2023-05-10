import styled from "styled-components";
import useGetProducts from "../../hooks/useGetProducts";
import ProductItem from "./ProductItem";

export default function ProductList() {
  const { value: products, loading, error } = useGetProducts("products.json");

  if (error) {
    return <div>Error!</div>;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <ProductListContainer>
      {products && products.map((product) => <ProductItem {...product} />)}
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
