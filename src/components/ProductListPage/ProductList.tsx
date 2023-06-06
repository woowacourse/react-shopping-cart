import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import productsQuery from '../../recoil/queries/productsQuery';
import ProductItem from './ProductItem';

const StyledProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 48px;
  row-gap: 80px;

  @media (max-width: 768px) {
    padding: 50px 40px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    padding: 50px 20px;
    grid-template-columns: repeat(1, 1fr);
  }
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
