import styled from "styled-components";
import ProductCard from "../ProductCard/ProductCard";
import mockData from "../../mockData/mockData.json";

const ProductCardList = () => {
  return (
    <ProductCardListContainer>
      {mockData.map((product) => (
        <ProductCard
          key={product.id}
          productId={product.id}
          productImage={product.imageUrl}
          productName={product.name}
          productPrice={product.price}
        />
      ))}
    </ProductCardListContainer>
  );
};

const ProductCardListContainer = styled.div`
  display: grid;
  padding-top: 61.16px;

  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 47.16px;
  grid-row-gap: 85.81px;
  width: 1270.43px;
  height: auto;
  margin: 0 auto 100px auto;
`;

export default ProductCardList;
