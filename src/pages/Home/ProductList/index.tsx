import { Product } from '@Types/index';

import useShoppingCart from '@Hooks/useShoppingCart';

import * as S from './style';
import ProductItem from '../ProductItem';

type ProductListProps = {
  data?: Product[];
  isLoading: boolean;
};

function ProductList({ data, isLoading }: ProductListProps) {
  const { updateShoppingCart } = useShoppingCart();
  return (
    <S.ProductListContainer>
      {data && data.map((data) => <ProductItem product={data} key={data.id} updateShoppingCart={updateShoppingCart} />)}
      {isLoading &&
        Array.from({ length: 12 }, (_, index) => (
          <ProductItem key={index} isLoading={isLoading} updateShoppingCart={updateShoppingCart} />
        ))}
    </S.ProductListContainer>
  );
}

export default ProductList;
