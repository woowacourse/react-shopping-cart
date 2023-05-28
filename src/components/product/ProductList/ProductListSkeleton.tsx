import { PRODUCT_LIST_SKELETON_ITEM_LENGTH } from '../../../constants';
import ProductItemSkeleton from '../ProductItem/ProductItemSkeleton';
import * as S from './ProductList.styles';

const ProductListSkeleton = () => {
  return (
    <S.ProductListContainer>
      {Array.from({ length: PRODUCT_LIST_SKELETON_ITEM_LENGTH }, (_, index) => (
        <ProductItemSkeleton key={index} />
      ))}
    </S.ProductListContainer>
  );
};

export default ProductListSkeleton;
