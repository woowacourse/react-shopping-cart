import { styled } from 'styled-components';
import client from '../api';
import FutureSuspense from '../components/FutureSuspense';
import ProductListItem from '../components/ProductListItem';
import useQuery from '../hooks/useQuery';
import type { Product } from '../type';

const StyledProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 48px;
  row-gap: 80px;
`;

type ProductListProps = {
  products: Product[];
};

const ProductList = (props: ProductListProps) => {
  const { products } = props;

  return (
    <StyledProductList>
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </StyledProductList>
  );
};

const ProductListPage = () => {
  const { future } = useQuery<Product[]>('products', () =>
    client.get('/products').then((res) => res.json()),
  );

  return (
    <FutureSuspense
      future={future}
      loadingElement={<div>로딩중...</div>}
      errorElement={<div>에러!!</div>}
    >
      {(products) => <ProductList products={products} />}
    </FutureSuspense>
  );
};

export default ProductListPage;
