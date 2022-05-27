import { skeletonSize } from './style';
import * as Styled from './style';
import PropTypes from 'prop-types';

const Skeleton = ({ sizeType }) => {
  return (
    <Styled.Wrapper sizeType={sizeType}>
      <Styled.LargeBox />
      <Styled.Container>
        <Styled.MediumBox />
        <Styled.SmallBox />
      </Styled.Container>
    </Styled.Wrapper>
  );
};

Skeleton.propTypes = {
  sizeType: PropTypes.oneOf(Object.keys(skeletonSize)),
};

export default Skeleton;
