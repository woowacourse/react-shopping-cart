import { styled } from 'styled-components';
import type { Product } from '../../types/product';
import ProductItem from '../ProductItem/ProductItem';

interface ProductListProps {
  products: Product[];
}
const ProductList = ({ products }: ProductListProps) => {
  return (
    <section>
      <ProductListContainer>
        {products.map((product) => (
          <li key={product.id}>
            <ProductItem {...product} />
          </li>
        ))}
      </ProductListContainer>
    </section>
  );
};

const ProductListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(282px, 1fr));
  grid-column-gap: 20px;
  grid-row-gap: 48px;
`;

export default ProductList;
