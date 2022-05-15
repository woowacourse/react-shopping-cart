import Styled, { skeletonSize } from './style';
import PropTypes from 'prop-types';

const Skeleton = ({ sizeType }) => {
  return (
    <Styled.Wrapper sizeType={sizeType}>
      <Styled.ProductImage />
      <Styled.ProductDetail>
        <Styled.ProductInfo>
          <Styled.ProductName />
          <Styled.ProductPrice />
        </Styled.ProductInfo>
      </Styled.ProductDetail>
    </Styled.Wrapper>
  );
};

Skeleton.propTypes = {
  sizeType: PropTypes.oneOf(Object.keys(skeletonSize)),
};

export default Skeleton;
