import { styled } from 'styled-components';
import ProductItem from '../ProductItem/ProductItem';
import { useRecoilValue } from 'recoil';
import { productListQuery } from '../../recoil/selectors';

const ProductList = () => {
  const products = useRecoilValue(productListQuery);

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
  grid-template-columns: repeat(auto-fit, minmax(282px, 1fr));
  grid-column-gap: 30px;
  grid-row-gap: 48px;

  place-items: center;

  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(4, minmax(282px, 1fr));
  }
`;

export default ProductList;
