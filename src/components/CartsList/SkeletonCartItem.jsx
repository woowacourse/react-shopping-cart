import styled from 'styled-components';
import Shimmer from 'components/Skeleton/Shimmer';
import {
  BasicDivideLine,
  BasicSkeletonElement,
  BasicSkeletonImage,
  Flex,
} from 'components/shared/basics';

function SkeletonCartItem() {
  return (
    <Style.Wrapper justify="space-between" gap="15px">
      <Flex gap="18px">
        <Style.SkeletonElement width="32px" height="32px" />
        <BasicSkeletonImage size="small" />
        <Style.SkeletonElement width="300px" height="30px" />
      </Flex>
      <Flex direction="column" align="flex-end" gap="10px">
        <Style.SkeletonElement width="32px" height="32px" />
        <Style.SkeletonElement width="100px" height="55px" />
        <Style.SkeletonElement width="80px" height="25px" />
      </Flex>
      <Shimmer />
    </Style.Wrapper>
  );
}

export default SkeletonCartItem;

const Style = {
  Wrapper: styled(Flex)`
    position: relative;
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    margin: 18px 0;
  `,
  SkeletonElement: styled(BasicSkeletonElement)`
    margin-top: 5px;
  `,
};
