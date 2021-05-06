import { VFC } from 'react';
import { Product } from '../../types';
import ProductCard from './ProductCard';
import { ProductListContainer } from './styles';

interface Props {
  products: Product[];
}

const ProductList: VFC<Props> = ({ products }) => {
  return (
    <ProductListContainer>
      {products.map((props) => (
        <ProductCard {...props} />
      ))}
    </ProductListContainer>
  );
};

export default ProductList;
