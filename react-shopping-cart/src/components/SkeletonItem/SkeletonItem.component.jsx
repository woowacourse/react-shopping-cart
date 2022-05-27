import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import Skeleton from 'components/@shared/Skeleton/Skeleton.component';

function SkeletonItem() {
  return (
    <FlexBox direction="column" gap="5px">
      <Skeleton width="282px" height="282px" />
      <Skeleton width="282px" height="28px" />
      <Skeleton width="282px" height="28px" />
    </FlexBox>
  );
}

export default SkeletonItem;
