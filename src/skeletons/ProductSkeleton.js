import React from 'react';
import styled from 'styled-components';

import Wrapper from 'pages/ProductsPage/style';
import SkeletonLine from 'styles/Skeleton';

const ProductWrapper = styled.div`
  width: 260px;
`;

const ProductSkeleton = () => {
  return (
    <Wrapper>
      <div className="body">
        {Array(4)
          .fill()
          .map((_, i) => (
            <ProductWrapper key={i}>
              <SkeletonLine width="260px" height="260px" mb="18px" />

              <div className="flex-row-space-between">
                <div>
                  <SkeletonLine width="90px" height="10px" mb="8px" />
                  <SkeletonLine width="60px" height="10px" />
                </div>

                <SkeletonLine width="30px" height="30px" />
              </div>
            </ProductWrapper>
          ))}
      </div>
    </Wrapper>
  );
};

export default ProductSkeleton;
