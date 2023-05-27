import styled from 'styled-components';

import useCartProductCount from '../../hooks/useCartProductCount';

const CartCountBox = () => {
  const cartProductCount = useCartProductCount();

  return <ProductCountAlert>{cartProductCount}</ProductCountAlert>;
};

const ProductCountAlert = styled.span`
  display: inline-block;
  width: 22px;
  height: 22px;
  margin-left: 6px;
  font-size: 16px;
  text-align: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  line-height: 24px;

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    width: 26px;
    height: 26px;
    line-height: 28px;
  }
`;

export default CartCountBox;
