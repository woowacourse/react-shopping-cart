import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import ProductItem from './ProductItem';
import productsQuery from '../recoil/queries/productsQuery';

const StyledProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 48px;
  row-gap: 80px;
`;

const ProductList = () => {
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
