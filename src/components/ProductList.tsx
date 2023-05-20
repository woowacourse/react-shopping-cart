import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import productsQuery from '../recoil/queries/productsQuery';
import ProductItem from './ProductItem';

const StyledProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 48px;
  row-gap: 80px;
`;

const ProductList = () => {
  const products = useRecoilValue(productsQuery);
  console.log(products);
  return (
    <StyledProductList>
      {products.map((product) => (
        <ProductItem key={product.id} productId={product.id} />
      ))}
    </StyledProductList>
  );
};

export default ProductList;
