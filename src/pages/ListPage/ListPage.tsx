import * as Styled from './ListPage.styles.tsx';
import ProductItem from '../../components/ProductItem/ProductItem.tsx';
import useFetchData from '../../hooks/useFetchData.ts';
import type { Product } from '../../types/index.ts';

const ListPage = () => {
  const { data } = useFetchData<Product[]>('/products');

  return (
    <Styled.ProductList>
      {data?.map((product) => {
        return <ProductItem key={product.id} {...product} />;
      })}
    </Styled.ProductList>
  );
};

export default ListPage;
