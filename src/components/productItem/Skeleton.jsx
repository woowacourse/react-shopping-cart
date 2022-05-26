import { v4 as uuidv4 } from 'uuid';

import {
  SkeletonProductContainer,
  SkeletonProductItem,
  SkeletonProductImage,
  SkeletonProductText,
} from 'components/productItem/style';

const Skeleton = () => {
  return (
    <SkeletonProductItem>
      <SkeletonProductImage></SkeletonProductImage>
      <SkeletonProductContainer>
        <SkeletonProductText name="true" />
        <SkeletonProductText price="true" />
      </SkeletonProductContainer>
    </SkeletonProductItem>
  );
};

export const getSkeletonList = length => {
  return Array.from({ length }).map(() => <Skeleton key={uuidv4()} />);
};

export default Skeleton;
