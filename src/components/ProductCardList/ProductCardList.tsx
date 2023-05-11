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
  max-width: 1270.43px;
  height: auto;
  margin: 0 auto 100px auto;

  @media (max-width: 1300px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 630px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default ProductCardList;
