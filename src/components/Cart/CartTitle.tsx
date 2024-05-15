/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';

import { CART_MESSAGE } from '@/constants/message';
import { WhiteSpace } from '@/style/common.style';
import { getCartItemCount } from '@/api/cartItem';
import styled from '@emotion/styled';

const CartTitle = () => {
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const cartItemsCountData = await getCartItemCount();
        setCartItemsCount(cartItemsCountData);
      } catch (error) {
        setError(error as Error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <StyledTitleWrapper>
      <StyledTitle>장바구니</StyledTitle>
      {/* {loading ? (
        <StyledSkeletonBox />
      ) : ( */}
      <StyledDetail>{CART_MESSAGE.totalProducts(cartItemsCount)}</StyledDetail>
      {/* )} */}
    </StyledTitleWrapper>
  );
};
export default CartTitle;

const StyledTitleWrapper = styled.div`
  ${WhiteSpace}
`;

const StyledTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-top: 20px;
`;

const StyledDetail = styled.p`
  font-size: 12px;
`;

// const StyledSkeletonBox = styled.div`
//   height: 12px;
//   background-color: red;
// `;
