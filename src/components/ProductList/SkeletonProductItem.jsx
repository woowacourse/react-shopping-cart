import styled from 'styled-components';
import Shimmer from 'components/shared/Shimmer';
import {
  BasicSkeletonElement,
  BasicSkeletonImage,
  Flex,
} from 'components/shared/basics';

function SkeletonProductItem() {
  return (
    <Style.Wrapper>
      <BasicSkeletonImage size="medium" />
      <Flex justify="space-between">
        <Flex direction="column">
          <Style.SkeletonElement width="150px" height="22px" />
          <Style.SkeletonElement width="30px" height="22px" />
        </Flex>
        <Flex align="center">
          <Style.SkeletonElement width="25px" height="25px" />
        </Flex>
      </Flex>
      <Shimmer />
    </Style.Wrapper>
  );
}

export default SkeletonProductItem;

const Style = {
  Wrapper: styled.div`
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  `,
  SkeletonElement: styled(BasicSkeletonElement)`
    margin-top: 3px;
  `,
};
