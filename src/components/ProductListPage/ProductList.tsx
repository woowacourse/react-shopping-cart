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
      {products &&
        products.map(({ id, name, price, imageUrl }) => (
          <ProductItem price={price} name={name} imageUrl={imageUrl} />
        ))}
    </ProductListContainer>
  );
}

const ProductListContainer = styled.ul``;
