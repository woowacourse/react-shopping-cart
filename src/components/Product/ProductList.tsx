import styled from 'styled-components';

import ProductItem from './ProductItem';

import useProducts from '../../hooks/useProducts';
import AbnormalMessage from '../Common/AbnormalMessage';

const ProductList = () => {
  const products = useProducts();

  if (products.length === 0) {
    return <AbnormalMessage abnormalState='empty' />;
  }

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
`;

export default ProductList;
