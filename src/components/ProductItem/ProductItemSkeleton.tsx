import * as S from './ProductItem.styles';

const ProductItemSkeleton = () => {
  return (
    <S.ProductItemContainer>
      <S.ItemImageContainer className="skeleton"></S.ItemImageContainer>
      <S.ItemName className="skeleton"></S.ItemName>
      <S.ItemPrice className="skeleton"></S.ItemPrice>
    </S.ProductItemContainer>
  );
};

export default ProductItemSkeleton;
