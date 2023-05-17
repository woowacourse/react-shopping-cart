import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { Header } from '../../components';
import CartItemList from '../trees/CartItemList';
import CartBill from '../leafs/CartBill';
import { cartCountState } from '../../recoil/state';

export default function CartPage() {
  const cartCount = useRecoilValue(cartCountState);

  return (
    <Wrapper>
      <Header />
      <Main>
        <CartHeader>
          <h2>장바구니</h2>
        </CartHeader>
        <CartCountMessage>배송 상품 ({cartCount}개)</CartCountMessage>
        <CartMain>
          <CartItemList />
          <CartBillBox>
            <CartBill />
          </CartBillBox>
        </CartMain>
      </Main>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding-top: 80px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 1320px;
  height: min-content;
  padding: 60px 0;

  @media (max-width: 1320px) {
    width: 100%;
  }
`;

const CartHeader = styled.div`
  width: 100%;
  border-bottom: 4px solid #333333;
  padding-bottom: 28px;

  line-height: 37px;
  letter-spacing: 0.5px;
  font-size: 32px;
  font-weight: 700;
  text-align: center;

  color: #333333;
`;

const CartCountMessage = styled.p`
  width: 100%;
  margin-top: 16px;
  padding: 24px 0;

  line-height: 33px;
  letter-spacing: 0.5px;
  font-size: 20px;
  color: #333333;
`;

const CartMain = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  @media (max-width: 1184px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CartBillBox = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 448px) {
    width: 100%;
    margin-top: 32px;
  }
`;
