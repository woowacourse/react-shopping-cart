import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { cartItemLengthSelector } from '@recoil/selectors/cartSelector';
import CartExpectedPrice from '@components/CartExpectedPrice';
import CartList from '@components/CartList';
import CartTitle from '@components/CartTitle';

const CartPage = () => {
  const cartLength = useRecoilValue(cartItemLengthSelector);

  return (
    <CartPageWrapper>
      <CartTitle />
      <CartCountTextWrapper>든든배송 상품({cartLength})</CartCountTextWrapper>
      <CartInformationWrapper>
        <CartList />
        <CartExpectedPrice />
      </CartInformationWrapper>
    </CartPageWrapper>
  );
};

const CartPageWrapper = styled.div`
  width: 100%;
  padding: 0 10%;

  margin-bottom: 140px;
`;

const CartCountTextWrapper = styled.span`
  font-size: 20px;
  line-height: 33px;
  /* or 165% */

  letter-spacing: 0.5px;
  display: block;

  margin: 34px 0 16px;

  color: #333333;
`;

const CartInformationWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 1023px) {
    display: flex;
    flex-direction: column;
  }
`;

export default CartPage;
