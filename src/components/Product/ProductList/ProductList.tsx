import { styled } from 'styled-components';
import ProductItem from '../ProductItem/ProductItem';
import useFetch from '../../../hooks/useFetch';
import { Product } from '../../../types/product';

const ProductList = () => {
  const { result: productList } = useFetch<Product[]>('./products', []);

  return (
    <section>
      <ProductListContainer>
        {productList.map((product) => (
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
  grid-template-columns: repeat(auto-fit, minmax(282px, 1fr));
  grid-column-gap: 30px;
  grid-row-gap: 48px;

  place-items: center;

  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(4, minmax(282px, 1fr));
  }
`;

export default ProductList;
