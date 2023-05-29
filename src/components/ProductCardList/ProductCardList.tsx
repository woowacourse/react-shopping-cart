import { Product } from 'types/product';
import ProductCard from './ProductCard/ProductCard';
import styled from 'styled-components';

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
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(auto, 1fr);
  gap: 36px 20px;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 420px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 360px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default ProductCardList;
