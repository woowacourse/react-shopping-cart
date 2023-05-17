import type { RecoilValueReadOnly } from 'recoil';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import type { Product } from '../type';
import ProductItem from './ProductItem';

const StyledProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 48px;
  row-gap: 80px;
`;

type ProductListProps = {
  productsQuery: RecoilValueReadOnly<Product[]>;
};

const ProductList = ({ productsQuery }: ProductListProps) => {
  const products = useRecoilValue(productsQuery);

  return (
    <StyledProductList>
      {products.map((product) => (
        <ProductItem key={product.id} productId={product.id} />
      ))}
    </StyledProductList>
  );
};

export default ProductList;
