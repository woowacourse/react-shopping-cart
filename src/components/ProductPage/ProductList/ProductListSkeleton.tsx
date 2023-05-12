import * as S from './ProductList.styles';

const ProductListSkeleton = () => {
  return (
    <S.List>
      {Array.from({ length: 10 }).map((_, ind) => (
        <li key={ind}>
          <S.SkeletonItem />
        </li>
      ))}
    </S.List>
  );
};

export default ProductListSkeleton;
