import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { fetchProductsSelector } from '../../recoil/productData';

import ProductItem from './ProductItem';
import Message from '../Common/Message';

const ProductList = () => {
  const products = useRecoilValue(fetchProductsSelector);

  if (products.length === 0) return <Message type='empty' />;

  return (
    <ProductListContainer>
      {products.map((product) => (
        <li key={product.id}>
          <ProductItem product={product} />
        </li>
      ))}
    </ProductListContainer>
  );
};

const ProductListContainer = styled.ul`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, 282px);
  grid-row-gap: 84px;
  grid-column-gap: 48px;

  @media (min-width: 640px) and (max-width: 768px) {
    grid-template-columns: repeat(2, 282px);
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(1, 282px);
  }
`;

export default ProductList;
