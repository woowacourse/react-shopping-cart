import styled from 'styled-components';
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

const skeletonSize = {
  large: `
    width: 380px;
    height: 350px;
  `,
  small: `
    width: 200px;
    height: 200px;
  `,
};

const skeletonStyle = `
  background-image: linear-gradient(
    90deg,
    #e0e0e0 0px,
    #ededed 30px,
    #e0e0e0 60px
  );
  animation: refresh 2s infinite ease-out;
  @keyframes refresh {
    0% {
      background-position: calc(-100px);
    }
    40%,
    100% {
      background-position: 280px;
    }
  }
`;

Skeleton.propTypes = {
  sizeType: PropTypes.oneOf(Object.keys(skeletonSize)),
};

const Styled = {
  Wrapper: styled.div`
    ${({ sizeType }) => `
      ${skeletonSize[sizeType]}
    `}
    margin-bottom: 30px;
  `,

  ProductImage: styled.div`
    max-width: 100%;
    height: 100%;
    ${skeletonStyle}
  `,

  ProductDetail: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 8px;
  `,

  ProductInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
  `,

  ProductName: styled.div`
    width: 180px;
    height: 18px;
    ${skeletonStyle}
  `,
  ProductPrice: styled.div`
    width: 147px;
    height: 18px;
    ${skeletonStyle}
  `,
};

export default Skeleton;
