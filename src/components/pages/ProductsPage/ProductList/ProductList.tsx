import * as Styled from './ProductList.styled';
import ProductItem from '../ProductItem/ProductItem';

import { Product } from '../../../../types/Product';

const ProductList = ({ list }: { list: Product[] }) => (
  <Styled.ProductList>
    {list.map((data) => (
      <ProductItem key={data.id} product={{ ...data }} />
    ))}
  </Styled.ProductList>
);

export default ProductList;
