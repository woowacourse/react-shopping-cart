import styled from 'styled-components';
import Shimmer from 'components/shared/Shimmer';
import {
  BasicDivideLine,
  BasicSkeletonElement,
  BasicSkeletonImage,
  Flex,
} from 'components/shared/basics';

function SkeletonProductDetail() {
  return (
    <Style.Wrapper direction="column">
      <BasicSkeletonImage size="large" />
      <Style.SkeletonElement width="150px" height="50px" />
      <BasicDivideLine weight="bold" mv="15px" color="lightgray" />
      <Flex justify="space-between">
        <Style.SkeletonElement width="32px" height="32px" />
        <Style.SkeletonElement width="80px" height="32px" />
      </Flex>
      <Style.SkeletonElement width="540px" height="85px" />
      <Shimmer />
    </Style.Wrapper>
  );
}

export default SkeletonProductDetail;

const Style = {
  Wrapper: styled(Flex)`
    position: fixed;
    border-radius: 4px;
    overflow: hidden;
  `,
  SkeletonElement: styled(BasicSkeletonElement)`
    margin-top: 5px;
  `,
};
