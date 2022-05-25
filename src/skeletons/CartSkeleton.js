import React from 'react';

import Wrapper from 'components/Cart/style';

import SkeletonLine from 'styles/Skeleton';

const CartSkeleton = () => {
  return (
    <Wrapper>
      <div className="left">
        <SkeletonLine width="28px" height="28px" />
        <SkeletonLine width="144px" height="147px" ml="20px" mr="15px" />
        <SkeletonLine width="30px" height="20px" />
      </div>
      <div className="right">
        <SkeletonLine width="24px" height="24px" />
        <SkeletonLine width="115px" height="60px" />
        <SkeletonLine width="30px" height="14px" />
      </div>
    </Wrapper>
  );
};

export default CartSkeleton;
