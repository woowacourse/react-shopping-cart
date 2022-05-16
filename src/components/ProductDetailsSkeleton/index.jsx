import React from "react";
import Skeleton from "../Skeleton";
import * as S from "./index.styles";

const ProductDetailsSkeleton = () => {
  return (
    <S.ProductDetailsSkeleton>
      <Skeleton width="570px" height="570px" />
      <Skeleton width="120px" height="35px" />
      <Skeleton width="570px" height="35px" />
      <Skeleton width="570px" height="50px" />
    </S.ProductDetailsSkeleton>
  );
};

export default ProductDetailsSkeleton;
