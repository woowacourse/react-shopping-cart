import ProductItem from '@Components/ProductItem';

import { Product } from '@Types/index';

import * as S from './style';

type ProductListProps = {
  data?: Product[];
  isLoading: boolean;
};

function ProductList({ data, isLoading }: ProductListProps) {
  return (
    <S.ProductListContainer>
      {data && data.map((data) => <ProductItem product={data} key={data.id} isLoading={isLoading} />)}
      {isLoading && Array.from({ length: 12 }, (_, index) => <ProductItem key={index} isLoading={isLoading} />)}
    </S.ProductListContainer>
  );
}

export default ProductList;
