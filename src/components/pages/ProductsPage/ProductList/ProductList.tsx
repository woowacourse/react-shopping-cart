import * as Styled from './ProductList.styled';
import ProductItem from '../ProductItem/ProductItem';

import { Product } from '../../../../types/Product';
import { DataFetcher } from '../../../../utils/fetchData';

interface ProductListProps {
  listFetcher: DataFetcher<Product[]>;
}

const ProductList = (props: ProductListProps) => {
  const { listFetcher } = props;

  return (
    <Styled.ProductList>
      {listFetcher.read().map((data) => (
        <ProductItem key={data.id} product={{ ...data }} />
      ))}
    </Styled.ProductList>
  );
};

export default ProductList;
