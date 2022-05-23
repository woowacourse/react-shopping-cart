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

export default Skeleton;
