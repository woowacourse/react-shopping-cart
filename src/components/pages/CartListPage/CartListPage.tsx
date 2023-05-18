import { useRecoilValue } from 'recoil';

import styled from 'styled-components';
import { Header, Estimate } from '../../../components';
import CartList from '../../trees/CartList/CartList';
import useCart from '../../../hooks/useCart';
import { selectedCartState } from '../../../recoil/state';

export default function CartListPage() {
  const [cart] = useCart();
  const allTotalPrice = cart.reduce(
    (accumulator, { product: { price }, quantity }) => accumulator + price * quantity,
    0
  );

  const selectedCart = useRecoilValue(selectedCartState);
  const selectedTotalPrice = cart
    .filter((item) => selectedCart.includes(item.product.id))
    .reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <S.Wrapper>
      <Header />
      <S.Main>
        <Title>장바구니</Title>
        <CartInfo>
          <CartList cartItems={cart}></CartList>
          {cart.length !== 0 && (
            <Estimate
              totalItemCount={cart.length}
              selectedItemCount={selectedCart.length}
              totalPrice={selectedCart.length === 0 ? allTotalPrice : selectedTotalPrice}
            ></Estimate>
          )}
        </CartInfo>
      </S.Main>
    </S.Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding-top: 80px;
`;

const Main = styled.main`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 30px;

  justify-content: center;
  margin: auto;

  margin-top: 15px;
`;

const Title = styled.div`
  width: 100%;

  padding: 20px;

  border-bottom: 4px solid black;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;

  text-align: center;
  letter-spacing: 0.5px;

  color: #333333;
`;

const CartInfo = styled.section`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1220px) {
    flex-direction: column;
    align-items: center;
  }
`;

const S = {
  Wrapper,
  Main,
};
