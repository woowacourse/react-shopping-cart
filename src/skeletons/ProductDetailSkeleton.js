import React from 'react';
import styled from 'styled-components';

import Wrapper from 'pages/ProductPage/style';
import SkeletonLine from 'styles/Skeleton';

const SkeletonWrapper = styled(Wrapper)`
  .image {
    margin: 0 auto;
  }
`;

const ProductSkeleton = () => {
  return (
    <SkeletonWrapper>
      <div className="product-wrapper">
        <SkeletonLine className="image" width="380px" height="380px" />
        <div className="top flex-row-space-between">
          <SkeletonLine width="70px" height="20px" />
          <SkeletonLine width="30px" height="20px" />
        </div>
        <div className="bottom flex-row-space-between">
          <SkeletonLine width="20px" height="20px" />
          <SkeletonLine width="50px" height="20px" />
        </div>
      </div>
    </SkeletonWrapper>
  );
};

export default ProductSkeleton;
