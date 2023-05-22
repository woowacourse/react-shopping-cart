import styled, { keyframes } from "styled-components";
import ProductCard from "../ProductCard/ProductCard";
import { useEffect } from "react";
import { useRecoilValue, useRecoilRefresher_UNSTABLE } from "recoil";
import { productsAtom, cartProductsAtom } from "../../store/fetchAtoms";

const ProductCardList = () => {
  const products = useRecoilValue(productsAtom);
  const cartProducts = useRecoilValue(cartProductsAtom);
  const refreshProducts = useRecoilRefresher_UNSTABLE(productsAtom);
  const refreshCartProducts = useRecoilRefresher_UNSTABLE(cartProductsAtom);

  useEffect(() => {
    refreshProducts();
    refreshCartProducts();
  }, [refreshProducts, refreshCartProducts]);

  return (
    <ProductCardListContainer>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          productId={product.id}
          productImage={product.imageUrl}
          productName={product.name}
          productPrice={product.price}
          productQuantity={
            (
              cartProducts.find(
                (cartProduct) => cartProduct.id === product.id
              ) || { quantity: 0 }
            ).quantity
          }
        />
      ))}
    </ProductCardListContainer>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ProductCardListContainer = styled.div`
  display: grid;
  padding-top: 141.16px;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 47.16px;
  grid-row-gap: 85.81px;
  max-width: 1270.43px;
  height: auto;
  margin: 0 auto 100px auto;
  animation: ${fadeIn} 0.3s;

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
