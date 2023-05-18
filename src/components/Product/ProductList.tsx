import styled from 'styled-components';

import ProductItem from './ProductItem';
import AbnormalMessage from '../Common/AbnormalMessage';

import { useRecoilValueLoadable } from 'recoil';
import { fetchProductsSelector } from '../../recoil/fetchProductData';
import type { Product } from '../../types/product';

const ProductList = () => {
  const products = useRecoilValueLoadable(fetchProductsSelector);

  const productListContent = (() => {
    switch (products.state) {
      case 'hasValue':
        return products.contents.length === 0 ? (
          <AbnormalMessage abnormalState='empty' />
        ) : (
          <ProductListContainer>
            {products.contents.map((product: Product) => (
              <li key={product.id}>
                <ProductItem product={product} />
              </li>
            ))}
          </ProductListContainer>
        );
      case 'loading':
        return <p>로딩중...</p>;
      case 'hasError':
        return <AbnormalMessage abnormalState='error' />;
      default:
        return <AbnormalMessage abnormalState='notFound' />;
    }
  })();
  return productListContent;
};

const ProductListContainer = styled.ul`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, 282px);
  grid-row-gap: 84px;
  grid-column-gap: 48px;
`;

export default ProductList;
