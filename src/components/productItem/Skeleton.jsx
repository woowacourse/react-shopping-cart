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
  const skeletonList = [];
  for (let i = 0; i < length; i++) {
    skeletonList.push(<Skeleton key={uuidv4()} />);
  }
  return skeletonList;
};

export default Skeleton;
