import * as S from "./index.styles";
import Skeleton from "../../@shared/Skeleton";

const ItemSkeleton = () => {
  return (
    <S.ItemSkeleton>
      <Skeleton width="280px" height="280px" />
      <Skeleton width="120px" height="20px" />
      <Skeleton width="220px" height="20px" />
    </S.ItemSkeleton>
  );
};

export default ItemSkeleton;
