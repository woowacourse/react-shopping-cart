import * as S from "./ProductList.style";

import ProductItemSkeleton from "../ProductItem/ProductItem.skeleton";

const ProductListSkeleton = () => {
  return (
    <S.ListWrapper>
      {Array.from({ length: 3 }).map((_, index) => (
        <ProductItemSkeleton key={index} />
      ))}
    </S.ListWrapper>
  );
};

export default ProductListSkeleton;
