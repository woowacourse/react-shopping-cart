import ProductCard from './ProductCard/ProductCard';
import styled from 'styled-components';
import { device } from 'styles/mixin';
import { Product } from 'types/product';

type ProductCardListProps = {
  products: Product[];
};

const ProductCardList = ({ products }: ProductCardListProps) => {
  return (
    <ProductGrid>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ProductGrid>
  );
};

const ProductGrid = styled.ul`
  display: grid;
  justify-items: center;

  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(auto-fill, 1fr);
  gap: 36px 20px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(auto-fill, 1fr);
    gap: 36px 20px;
  }

  @media (max-width: 890px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(auto-fill, 1fr);
    gap: 36px 20px;
  }

  @media (max-width: 670px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(auto-fill, 1fr);
    gap: 36px 20px;
  }

  @media (max-width: 440px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(auto-fill, 1fr);
    gap: 36px 20px;
  }
`;

export default ProductCardList;
