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
        <ProductCard product={product} />
      ))}
    </ProductGrid>
  );
};

const ProductGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(auto, 1fr);
  gap: 36px 20px;
`;

export default ProductCardList;
