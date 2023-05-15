import { PRODUCT_LIST_SKELETON_ITEM_LENGTH } from '../../constants';
import ProductItem from '../ProductItem/ProductItem';
import * as S from './ProductList.styles';

const ProductListSkeleton = () => {
  return (
    <S.ProductListContainer>
      {Array.from({ length: PRODUCT_LIST_SKELETON_ITEM_LENGTH }, (_, index) => (
        <ProductItem.Skeleton key={index} />
      ))}
    </S.ProductListContainer>
  );
};

export { ProductListSkeleton };
