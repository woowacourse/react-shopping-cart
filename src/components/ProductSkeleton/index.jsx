import * as S from "./index.styles";
import Skeleton from "../Skeleton";

const ProductSkeleton = () => {
  return (
    <S.ProductSkeleton>
      <Skeleton width="280px" height="280px" />
      <Skeleton width="120px" height="20px" />
      <Skeleton width="220px" height="20px" />
    </S.ProductSkeleton>
  );
};

export default ProductSkeleton;
