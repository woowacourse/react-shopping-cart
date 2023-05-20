import { Product } from '@Types/index';

import useShoppingCart from '@Hooks/useCartItems';

import * as S from './style';
import ProductItem from '../ProductItem';

type ProductListProps = {
  data?: Product[];
  isLoading: boolean;
};

function ProductList({ data, isLoading }: ProductListProps) {
  const { updateCartItem } = useShoppingCart();
  return (
    <S.ProductListContainer>
      {data && data.map((data) => <ProductItem product={data} key={data.id} updateCartItem={updateCartItem} />)}
      {isLoading &&
        Array.from({ length: 12 }, (_, index) => (
          <ProductItem key={index} isLoading={isLoading} updateCartItem={updateCartItem} />
        ))}
    </S.ProductListContainer>
  );
}

export default ProductList;
