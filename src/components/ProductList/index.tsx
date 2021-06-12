import { VFC } from 'react';
import { useHistory } from 'react-router';
import { Product } from '../../types';
import ProductCard from './ProductCard';
import { ProductListContainer } from './styles';

interface Props {
  products: Product[];
}

const ProductList: VFC<Props> = ({ products }) => {
  const history = useHistory();

  return (
    <ProductListContainer>
      {products.map((product) => (
        <ProductCard
          key={product.productId}
          onClick={() => history.push(`/product/${product.productId}`)}
          product={product}
        />
      ))}
    </ProductListContainer>
  );
};

export default ProductList;
