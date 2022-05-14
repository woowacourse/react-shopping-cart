import Skeleton from 'components/Skeleton';

const SkeletonList = ({ length }) => {
  return Array.from({ length }).map((_, index) => (
    <Skeleton key={index} sizeType="small" />
  ));
};

export default SkeletonList;
