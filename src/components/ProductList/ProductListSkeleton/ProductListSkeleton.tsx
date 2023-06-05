import * as styled from './ProductListSkeleton.styled';

import { SKELETON_LENGTH } from '../../../constants';

export const ProductListSkeleton = () => {
  return (
    <styled.SkeletonsContainer>
      <styled.TotalProductLengthSkeleton>총 ? 개의 상품</styled.TotalProductLengthSkeleton>
      <styled.Skeletons>
        {Array.from({ length: SKELETON_LENGTH }).map((_, i) => (
          <styled.Skeleton key={i}>
            <styled.Image />
            <styled.Info>
              <styled.Text />
              <styled.Text />
            </styled.Info>
          </styled.Skeleton>
        ))}
      </styled.Skeletons>
    </styled.SkeletonsContainer>
  );
};
