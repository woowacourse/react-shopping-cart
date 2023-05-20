import { styled } from 'styled-components';
import { cartAtom } from '@recoil/atoms/cartAtom';
import CartExpectedPrice from '@components/CartExpectedPrice';
import CartList from '@components/CartList';
import CartTitle from '@components/CartTitle';
import Button from '@components/common/Button';
import CheckBox from '@components/common/CheckBox';
import useAtomLocalStorage from '@hooks/useAtomLocalStorage';
import { CartInformation } from '@type/types';
import { CART_LIST_LOCAL_KEY } from '@constants/common';

const CartPage = () => {
  const [cart] = useAtomLocalStorage<CartInformation[]>(
    cartAtom,
    CART_LIST_LOCAL_KEY
  );

  return (
    <CartPageWrapper>
      <CartTitle />
      <CartCountTextWrapper>든든배송 상품({cart.length})</CartCountTextWrapper>
      <CartInformationWrapper>
        <CartList />
        <CartExpectedPrice />
      </CartInformationWrapper>
      <CartPageBottom>
        <CheckBox />
        <CartSelectorText>전체선택(2/3)</CartSelectorText>
        <Button
          text="선택삭제"
          onClick={() => {}}
          width="100px"
          height="35px"
          fontSize="16px"
          background="white"
          color="#333333"
        />
      </CartPageBottom>
    </CartPageWrapper>
  );
};

const CartPageWrapper = styled.div`
  width: 100%;
  padding: 0 15%;

  margin-bottom: 140px;
`;

const CartCountTextWrapper = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
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
`;

const CartPageBottom = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
`;
const CartSelectorText = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  /* or 125% */

  letter-spacing: 0.5px;

  margin: 0 13px;

  color: #333333;
`;

export default CartPage;
